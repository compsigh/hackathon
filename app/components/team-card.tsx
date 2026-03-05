import { Form } from "react-router";
import { InviteForm } from "./invite-form";

interface TeamCardProps {
  team: { id: string; name: string; ownerId: string };
  members: { id: string; name: string; email: string }[];
  userId: string;
  maxTeamSize: number;
  registeredUsers: { id: string; name: string; email: string }[];
}

export function TeamCard({
  team,
  members,
  userId,
  maxTeamSize,
  registeredUsers,
}: TeamCardProps) {
  const isOwner = team.ownerId === userId;
  const canInvite = isOwner && members.length < maxTeamSize;

  // Filter out users already on the team
  const memberIds = new Set(members.map((m) => m.id));
  const invitableUsers = registeredUsers.filter((u) => !memberIds.has(u.id));

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{team.name}</h2>
        <span className="text-sm text-(--color-light-50)">
          {members.length}/{maxTeamSize} members
        </span>
      </div>

      {/* Rename form (owner only) */}
      {isOwner && (
        <Form method="post" className="flex gap-3">
          <input type="hidden" name="intent" value="rename-team" />
          <input type="hidden" name="teamId" value={team.id} />
          <input
            name="name"
            type="text"
            placeholder="New team name"
            defaultValue={team.name}
            className="flex-1 rounded-lg border border-(--color-light-30) bg-(--color-dark) px-4 py-2 text-sm text-(--color-light) outline-none focus:border-(--color-compsigh)"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-lg border border-(--color-light-30) px-4 py-2 text-sm transition-colors hover:border-(--color-compsigh)"
          >
            Rename
          </button>
        </Form>
      )}

      {/* Members list */}
      <div className="space-y-2">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between rounded-lg border border-(--color-light-10) p-3"
          >
            <div>
              <span className="font-medium">{member.name}</span>
              {member.id === team.ownerId && (
                <span className="ml-2 text-xs text-(--color-compsigh)">
                  Owner
                </span>
              )}
            </div>
            {isOwner && member.id !== userId && (
              <Form method="post">
                <input type="hidden" name="intent" value="remove-member" />
                <input type="hidden" name="teamId" value={team.id} />
                <input type="hidden" name="memberId" value={member.id} />
                <button
                  type="submit"
                  className="cursor-pointer text-sm text-red-400 hover:underline"
                >
                  Remove
                </button>
              </Form>
            )}
          </div>
        ))}
      </div>

      {/* Invite members */}
      {canInvite && invitableUsers.length > 0 && (
        <InviteForm teamId={team.id} users={invitableUsers} />
      )}

      {/* Leave / Disband */}
      <Form method="post">
        <input type="hidden" name="intent" value="leave-team" />
        <input type="hidden" name="teamId" value={team.id} />
        <button
          type="submit"
          className="cursor-pointer text-sm text-red-400 hover:underline"
        >
          {isOwner ? "Disband team" : "Leave team"}
        </button>
      </Form>
    </section>
  );
}
