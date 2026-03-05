import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/auth";
import { auth } from "~/lib/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (session) {
    throw redirect("/dashboard");
  }
  return null;
}

export default function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1 className="font-proto-mono text-4xl font-semibold [text-shadow:0_0_20px_var(--color-compsigh-60)]">
            <span className="animate-[fade_2s_linear_infinite]">&#9654;</span>
            DEPLOY/<span className="text-(--color-compsigh)">25</span>
          </h1>
        </div>
        <Outlet />
      </div>
    </main>
  );
}
