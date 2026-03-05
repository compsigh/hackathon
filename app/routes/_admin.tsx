import { Outlet, redirect, Link, useLocation } from "react-router";
import type { Route } from "./+types/_admin";
import { auth } from "~/lib/auth.server";
import { db } from "~/db/db.server";
import { user } from "~/db/schema.server";
import { eq } from "drizzle-orm";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) throw redirect("/login");

  const [dbUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));

  if (!dbUser || dbUser.role !== "admin") throw redirect("/dashboard");

  return { user: { id: dbUser.id, name: dbUser.name, role: dbUser.role } };
}

export default function AdminLayout() {
  const location = useLocation();

  const tabs = [
    { to: "/admin", label: "Overview" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/teams", label: "Teams" },
    { to: "/admin/config", label: "Config" },
  ];

  return (
    <div className="min-h-screen">
      <nav className="border-b border-(--color-light-10) px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="font-proto-mono text-lg font-semibold [text-shadow:0_0_10px_var(--color-compsigh-60)]"
            >
              <span className="animate-[fade_2s_linear_infinite]">&#9654;</span>
              DEPLOY/<span className="text-(--color-compsigh)">25</span>
            </Link>
            <div className="flex gap-4">
              {tabs.map((tab) => (
                <Link
                  key={tab.to}
                  to={tab.to}
                  className={`text-sm transition-colors ${
                    location.pathname === tab.to
                      ? "text-(--color-compsigh)"
                      : "hover:text-(--color-compsigh)"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
          <Link
            to="/dashboard"
            className="text-sm text-(--color-light-50) hover:text-(--color-light)"
          >
            Back to app
          </Link>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
