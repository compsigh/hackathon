"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/trpc/react";
import { Navbar } from "../_components/navbar";
import { ProtoMono } from "../fonts";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: users, isLoading } = api.admin.getAllUsers.useQuery(
    undefined,
    {
      enabled: status === "authenticated",
    },
  );

  // Format graduating class by removing CO prefix
  const formatGraduatingClass = (gradClass: string | null | undefined) => {
    if (!gradClass) return "—";
    if (gradClass.startsWith("CO")) {
      return gradClass.slice(2);
    }
    return gradClass === "MASTERS" ? "Masters" : gradClass;
  };

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
      {/* Logo/Brand */}
      <div className="absolute top-0 left-0 z-10 p-4">
        <Link
          href="/"
          className="flex h-10 cursor-pointer items-center space-x-3 hover:underline"
        >
          <Image
            src="/compsigh-logo-glowing.png"
            alt="deploy 25"
            width={100}
            height={100}
            className="h-full w-auto"
          />
          <span
            className={`text-xl tracking-tight [text-shadow:0_0_10px_var(--color-compsigh-60)] sm:text-2xl ${ProtoMono.className}`}
          >
            <span className="animate-[fade_2s_linear_infinite]">►</span>DEPLOY/
            <span className="text-[var(--color-compsigh)]">25</span>
          </span>
        </Link>
      </div>
      <div className="container mx-auto max-w-2xl px-4 pt-28 pb-8 sm:pt-20">
        <h1 className="mb-8 text-4xl font-bold">Admin Dashboard</h1>

        <div className="space-y-6">
          {/* Users Table */}
          {users && users.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-[var(--color-light-30)] bg-[var(--color-dark)]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-light-30)]">
                    <th className={`px-4 py-3 text-left text-sm font-medium text-[var(--color-light)] ${ProtoMono.className}`}>
                      Name
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-medium text-[var(--color-light)] ${ProtoMono.className}`}>
                      Email
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-medium text-[var(--color-light)] ${ProtoMono.className}`}>
                      Graduating Class
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-medium text-[var(--color-light)] ${ProtoMono.className}`}>
                      Team
                    </th>
                    <th className={`px-4 py-3 text-left text-sm font-medium text-[var(--color-light)] ${ProtoMono.className}`}>
                      Attended
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className={`${
                        index < users.length - 1
                          ? "border-b border-[var(--color-light-30)]"
                          : ""
                      } ${
                        index % 2 === 0
                          ? "bg-[var(--color-dark)]"
                          : "bg-[var(--color-dark)]/50"
                      }`}
                    >
                      <td className={`px-4 py-3 text-[var(--color-light)] ${ProtoMono.className}`}>
                        {user.name ?? user.preferredName ?? "—"}
                      </td>
                      <td className={`px-4 py-3 text-[var(--color-light)] ${ProtoMono.className}`}>
                        {user.email ?? "—"}
                      </td>
                      <td className={`px-4 py-3 text-[var(--color-light)] ${ProtoMono.className}`}>
                        {formatGraduatingClass(user.graduatingClass)}
                      </td>
                      <td className={`px-4 py-3 text-[var(--color-light)] ${ProtoMono.className}`}>
                        {user.team?.name ?? "—"}
                      </td>
                      <td className={`px-4 py-3 ${ProtoMono.className}`}>
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-bold ${
                            user.attended
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {user.attended ? "Yes" : "No"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg border border-[var(--color-light-30)] bg-[var(--color-dark)] p-6 text-center text-[var(--color-light-50)]">
              No users found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

