"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/trpc/react";
import { Navbar } from "../_components/navbar";
import { LogoBrand } from "../_components/logo-brand";
import { UsersTable } from "../_components/users-table";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: users, isLoading } = api.admin.getAllUsers.useQuery(
    undefined,
    {
      enabled: status === "authenticated",
    },
  );

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    } else if (
      status === "authenticated" &&
      !session?.user?.isAdmin
    ) {
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

        <div className="space-y-6">
          {users && <UsersTable users={users} />}
        </div>
      </div>
    </main>
  );
}
