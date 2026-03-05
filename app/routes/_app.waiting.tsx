import { redirect } from "react-router";
import type { Route } from "./+types/_app.waiting";
import { auth } from "~/lib/auth.server";
import { db } from "~/db/db.server";
import { teamMember, team, user, hackathonConfig } from "~/db/schema.server";
import { eq } from "drizzle-orm";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) throw redirect("/login");

  // Check user has a team
  const membership = await db
    .select({ teamId: teamMember.teamId })
    .from(teamMember)
    .where(eq(teamMember.userId, session.user.id))
    .limit(1);

  if (!membership[0]) throw redirect("/dashboard");

  const [userTeam] = await db
    .select()
    .from(team)
    .where(eq(team.id, membership[0].teamId));

  const members = await db
    .select({ name: user.name })
    .from(teamMember)
    .innerJoin(user, eq(user.id, teamMember.userId))
    .where(eq(teamMember.teamId, membership[0].teamId));

  const [config] = await db.select().from(hackathonConfig).limit(1);

  return {
    team: userTeam,
    members,
    config: config ?? null,
  };
}

export default function WaitingPage({ loaderData }: Route.ComponentProps) {
  const { team: userTeam, members, config } = loaderData;

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-8">
        <h1 className="font-proto-mono text-4xl font-semibold [text-shadow:0_0_20px_var(--color-compsigh-60)]">
          <span className="animate-[fade_2s_linear_infinite]">&#9654;</span>
          DEPLOY/<span className="text-(--color-compsigh)">25</span>
        </h1>
      </div>

      <div className="space-y-6">
        <p className="text-xl text-(--color-light-50)">
          You&apos;re all set! Waiting for the hackathon to begin...
        </p>

        {userTeam && (
          <div className="rounded-lg border border-(--color-light-30) p-6">
            <h2 className="mb-4 text-2xl font-bold">{userTeam.name}</h2>
            <div className="space-y-1">
              {members.map((m, i) => (
                <p key={i} className="text-(--color-light-50)">
                  {m.name}
                </p>
              ))}
            </div>
          </div>
        )}

        {config?.startTime && (
          <p className="text-sm text-(--color-light-50)">
            Starts{" "}
            {new Date(config.startTime).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </div>
  );
}
