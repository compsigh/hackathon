import { Form } from "react-router";
import { useState } from "react";

interface InviteFormProps {
  teamId: string;
  users: { id: string; name: string; email: string }[];
}

export function InviteForm({ teamId, users }: InviteFormProps) {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-(--color-light-50)">
        Invite a member
      </h3>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-(--color-light-30) bg-(--color-dark) px-4 py-2 text-sm text-(--color-light) outline-none focus:border-(--color-compsigh)"
      />
      {search && (
        <div className="max-h-48 space-y-1 overflow-y-auto">
          {filtered.map((u) => (
            <Form key={u.id} method="post" className="flex items-center justify-between rounded-lg border border-(--color-light-10) p-2">
              <input type="hidden" name="intent" value="invite-member" />
              <input type="hidden" name="teamId" value={teamId} />
              <input type="hidden" name="inviteeId" value={u.id} />
              <div>
                <span className="text-sm font-medium">{u.name}</span>
                <span className="ml-2 text-xs text-(--color-light-50)">
                  {u.email}
                </span>
              </div>
              <button
                type="submit"
                className="cursor-pointer rounded-lg bg-(--color-compsigh) px-3 py-1 text-xs font-medium text-(--color-dark)"
              >
                Invite
              </button>
            </Form>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-(--color-light-50)">No users found</p>
          )}
        </div>
      )}
    </div>
  );
}
