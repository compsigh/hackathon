"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { Navbar } from "../_components/navbar";
import { LogoBrand } from "../_components/logo-brand";
import { UsersTable } from "../_components/users-table";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: users, isLoading } = api.admin.getAllUsers.useQuery(undefined, {
    enabled: status === "authenticated",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    } else if (status === "authenticated" && !session?.user?.isAdmin) {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading" || isLoading) {
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-2xl">Loading...</div>
      </main>
    );
  }

  if (status === "unauthenticated" || !session?.user?.isAdmin) {
    return null;
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <LogoBrand />
      <div className="container mx-auto max-w-2xl px-4 pt-28 pb-8 sm:pt-20">
        <h1 className="mb-8 text-4xl font-bold">Admin Dashboard</h1>

        <div className="mb-6 rounded-lg border-2 border-[var(--color-compsigh)] p-4">
          <p className="text-sm text-[var(--color-light)]">
            <strong className="text-[var(--color-compsigh)]">
              Participant View:
            </strong>{" "}
            Switch to participant view.{" "}
            <Link
              href="/participant"
              className="font-medium text-[var(--color-compsigh)] hover:underline hover:decoration-[var(--color-compsigh)]"
            >
              Access participant panel →
            </Link>
          </p>
        </div>

        <div className="space-y-6">{users && <UsersTable users={users} />}</div>
      </div>
    </main>
  );
}
