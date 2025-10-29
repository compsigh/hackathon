"use client";

import { api } from "~/trpc/react";

export function RegisteredCount() {
  const { data: stats, isLoading } = api.stats.getRegisteredCount.useQuery();

  return (
    <div className="text-center text-xl">
      <span className="font-bold" style={{ color: "var(--color-compsigh)" }}>
        {isLoading ? "-" : stats?.count ?? 0}
      </span>{" "}
      {stats?.count === 1 ? "Person Registered" : "People Registered"}
    </div>
  );
}
