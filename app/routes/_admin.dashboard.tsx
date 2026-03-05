import type { Route } from "./+types/_admin.dashboard";
import { db } from "~/db/db.server";
import { user, team, teamMember, hackathonConfig } from "~/db/schema.server";
import { sql, eq } from "drizzle-orm";

export async function loader({}: Route.LoaderArgs) {
  const [userCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(user);
  const [registeredCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(user)
    .where(eq(user.registrationComplete, true));
  const [teamCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(team);
  const [memberCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(teamMember);
  const [config] = await db.select().from(hackathonConfig).limit(1);

  return {
    stats: {
      totalUsers: userCount?.count ?? 0,
      registeredUsers: registeredCount?.count ?? 0,
      totalTeams: teamCount?.count ?? 0,
      usersOnTeams: memberCount?.count ?? 0,
    },
    hackathonState: config?.state ?? "pre",
  };
}

export default function AdminDashboard({ loaderData }: Route.ComponentProps) {
  const { stats, hackathonState } = loaderData;

  const statCards = [
    { label: "Total Users", value: stats.totalUsers },
    { label: "Registered", value: stats.registeredUsers },
    { label: "Teams", value: stats.totalTeams },
    { label: "On Teams", value: stats.usersOnTeams },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Overview</h1>
        <span className="rounded-lg bg-(--color-compsigh)/20 px-3 py-1 text-sm font-medium text-(--color-compsigh)">
          State: {hackathonState}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-(--color-light-10) p-4"
          >
            <p className="text-sm text-(--color-light-50)">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
