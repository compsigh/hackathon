import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/_app";
import { auth } from "~/lib/auth.server";
import { db } from "~/db/db.server";
import { user } from "~/db/schema.server";
import { eq } from "drizzle-orm";
import { Nav } from "~/components/nav";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) throw redirect("/login");

  const [dbUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));
  if (!dbUser?.registrationComplete) throw redirect("/register");

  return {
    user: {
      id: session.user.id,
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
    },
  };
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div className="min-h-screen">
      <Nav user={loaderData.user} />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
