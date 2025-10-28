"use client";

import { signOut, useSession } from "next-auth/react";

export function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (status === "authenticated") {
    return (
      <nav className="fixed top-0 right-0 z-10 p-4">
        <div className="flex h-10 items-center">
          <button
            onClick={() => void signOut({ callbackUrl: "/" })}
            className="cursor-pointer bg-transparent font-sans text-[var(--color-compsigh)] transition-all hover:underline hover:decoration-[var(--color-compsigh)]"
          >
            Logout
          </button>
        </div>
      </nav>
    );
  }

  return null;
}

