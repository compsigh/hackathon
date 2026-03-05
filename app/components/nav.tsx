import { Link } from "react-router";
import { authClient } from "~/lib/auth.client";

interface NavProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function Nav({ user }: NavProps) {
  async function handleSignOut() {
    await authClient.signOut();
    window.location.href = "/";
  }

  return (
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
            <Link
              to="/dashboard"
              className="text-sm transition-colors hover:text-(--color-compsigh)"
            >
              Dashboard
            </Link>
            <Link
              to="/rules"
              className="text-sm transition-colors hover:text-(--color-compsigh)"
            >
              Rules
            </Link>
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="text-sm text-(--color-compsigh) transition-opacity hover:opacity-80"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-(--color-light-50)">{user.name}</span>
          <button
            onClick={handleSignOut}
            className="cursor-pointer text-sm text-(--color-light-50) transition-colors hover:text-(--color-light)"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
