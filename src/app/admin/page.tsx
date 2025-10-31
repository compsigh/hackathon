"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/trpc/react";
import { Navbar } from "../_components/navbar";
import { UsersTable } from "../_components/users-table";
import { ProtoMono } from "../fonts";

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
