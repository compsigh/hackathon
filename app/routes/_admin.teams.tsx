import { Form } from "react-router";
import type { Route } from "./+types/_admin.teams";
import { db } from "~/db/db.server";
import { team, teamMember, user } from "~/db/schema.server";
import { eq, and } from "drizzle-orm";

export async function loader({}: Route.LoaderArgs) {
  const teams = await db.select().from(team).orderBy(team.createdAt);

  const teamsWithMembers = await Promise.all(
    teams.map(async (t) => {
      const members = await db
        .select({ id: user.id, name: user.name, email: user.email })
        .from(teamMember)
        .innerJoin(user, eq(user.id, teamMember.userId))
        .where(eq(teamMember.teamId, t.id));
      return { ...t, members };
    }),
  );

  return { teams: teamsWithMembers };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = String(formData.get("intent"));

  switch (intent) {
    case "delete-team": {
      const teamId = String(formData.get("teamId"));
      await db.delete(teamMember).where(eq(teamMember.teamId, teamId));
      await db.delete(team).where(eq(team.id, teamId));
      return { success: true };
    }
    case "remove-member": {
      const teamId = String(formData.get("teamId"));
      const memberId = String(formData.get("memberId"));
      await db
        .delete(teamMember)
        .where(
          and(
            eq(teamMember.teamId, teamId),
            eq(teamMember.userId, memberId),
          ),
        );
      return { success: true };
    }
    default:
      return { error: "Unknown action" };
  }
}

export default function AdminTeamsPage({ loaderData }: Route.ComponentProps) {
  const { teams } = loaderData;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Teams ({teams.length})</h1>

      <div className="space-y-4">
        {teams.map((t) => (
          <div
            key={t.id}
            className="rounded-lg border border-(--color-light-10) p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <Form method="post">
                <input type="hidden" name="intent" value="delete-team" />
                <input type="hidden" name="teamId" value={t.id} />
                <button
                  type="submit"
                  className="cursor-pointer text-xs text-red-400 hover:underline"
                  onClick={(e) => {
                    if (!confirm("Delete this team?")) e.preventDefault();
                  }}
                >
                  Delete team
                </button>
              </Form>
            </div>
            <div className="space-y-1">
              {t.members.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span>
                    {m.name}{" "}
                    <span className="text-(--color-light-50)">({m.email})</span>
                    {m.id === t.ownerId && (
                      <span className="ml-1 text-xs text-(--color-compsigh)">
                        owner
                      </span>
                    )}
                  </span>
                  <Form method="post">
                    <input type="hidden" name="intent" value="remove-member" />
                    <input type="hidden" name="teamId" value={t.id} />
                    <input type="hidden" name="memberId" value={m.id} />
                    <button
                      type="submit"
                      className="cursor-pointer text-xs text-red-400 hover:underline"
                    >
                      Remove
                    </button>
                  </Form>
                </div>
              ))}
            </div>
          </div>
        ))}
        {teams.length === 0 && (
          <p className="text-(--color-light-50)">No teams yet.</p>
        )}
      </div>
    </div>
  );
}
