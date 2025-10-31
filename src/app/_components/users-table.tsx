import { ProtoMono } from "../fonts";
import { formatGraduatingClass } from "./types";

interface User {
  id: string;
  name: string | null;
  preferredName: string | null;
  email: string | null;
  graduatingClass: string | null;
  team: { name: string } | null;
  attended: boolean;
  referrals: unknown[] | null;
  referredBy: { name: string | null; email: string | null } | null;
}

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--color-light-30)] bg-[var(--color-dark)] p-6 text-center text-[var(--color-light-50)]">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--color-light-30)] bg-[var(--color-dark)]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--color-light-30)]">
            <th
              className={`px-4 py-3 text-left text-sm font-medium text-[var(--color-light)] ${ProtoMono.className}`}
            >
              Name
            </th>
            <th
              className={`px-4 py-3 text-left text-sm font-medium text-[var(--color-light)] ${ProtoMono.className}`}
            >
              Email
            </th>
            <th
              className={`px-4 py-3 text-left text-sm font-medium text-[var(--color-light)] ${ProtoMono.className}`}
            >
              Graduating Class
            </th>
            <th
              className={`px-4 py-3 text-left text-sm font-medium text-[var(--color-light)] ${ProtoMono.className}`}
            >
              Team
            </th>
            <th
              className={`px-4 py-3 text-left text-sm font-medium text-[var(--color-light)] ${ProtoMono.className}`}
            >
              Attended
            </th>
            <th
              className={`px-4 py-3 text-left text-sm font-medium text-[var(--color-light)] ${ProtoMono.className}`}
            >
              Referrals
            </th>
            <th
              className={`px-4 py-3 text-left text-sm font-medium text-[var(--color-light)] ${ProtoMono.className}`}
            >
              Referred By
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
              <td
                className={`px-4 py-3 text-[var(--color-light)] ${ProtoMono.className}`}
              >
                {user.name ?? user.preferredName ?? "—"}
              </td>
              <td
                className={`px-4 py-3 text-[var(--color-light)] ${ProtoMono.className}`}
              >
                {user.email ?? "—"}
              </td>
              <td
                className={`px-4 py-3 text-[var(--color-light)] ${ProtoMono.className}`}
              >
                {formatGraduatingClass(
                  user.graduatingClass as
                    | "CO2029"
                    | "CO2028"
                    | "CO2027"
                    | "CO2026"
                    | "CO2025"
                    | "MASTERS"
                    | null,
                )}
              </td>
              <td
                className={`px-4 py-3 text-[var(--color-light)] ${ProtoMono.className}`}
              >
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
              <td
                className={`px-4 py-3 text-[var(--color-light)] ${ProtoMono.className}`}
              >
                {user.referrals?.length ?? 0}
              </td>
              <td
                className={`px-4 py-3 text-[var(--color-light)] ${ProtoMono.className}`}
              >
                {user.referredBy
                  ? `${user.referredBy.name ?? "—"} (${
                      user.referredBy.email?.split("@")[0] ?? "—"
                    })`
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
