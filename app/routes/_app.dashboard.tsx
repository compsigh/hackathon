import { Form, useActionData } from "react-router";
import type { Route } from "./+types/_app.dashboard";
import { auth } from "~/lib/auth.server";
import { db } from "~/db/db.server";
import {
  user,
  team,
  teamMember,
  invitation,
  hackathonConfig,
} from "~/db/schema.server";
import { eq, and, ne, sql } from "drizzle-orm";
import { randomUUID } from "crypto";
import { redirect } from "react-router";
import { TeamCard } from "~/components/team-card";
import { InviteForm } from "~/components/invite-form";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) throw redirect("/login");

  const userId = session.user.id;

  // Get hackathon config
  const [config] = await db.select().from(hackathonConfig).limit(1);

  // Get user's team membership
  const membership = await db
    .select({ teamId: teamMember.teamId })
    .from(teamMember)
    .where(eq(teamMember.userId, userId))
    .limit(1);

  let userTeam = null;
  let members: { id: string; name: string; email: string }[] = [];

  if (membership[0]) {
    const [t] = await db
      .select()
      .from(team)
      .where(eq(team.id, membership[0].teamId));
    if (t) {
      userTeam = t;
      members = await db
        .select({ id: user.id, name: user.name, email: user.email })
        .from(teamMember)
        .innerJoin(user, eq(user.id, teamMember.userId))
        .where(eq(teamMember.teamId, t.id));
    }
  }

  // Get pending invitations for this user
  const pendingInvitations = await db
    .select({
      id: invitation.id,
      teamId: invitation.teamId,
      teamName: team.name,
      inviterName: user.name,
    })
    .from(invitation)
    .innerJoin(team, eq(team.id, invitation.teamId))
    .innerJoin(user, eq(user.id, invitation.inviterId))
    .where(
      and(
        eq(invitation.inviteeId, userId),
        eq(invitation.status, "pending"),
      ),
    );

  // Get registered users (for inviting)
  const registeredUsers = await db
    .select({ id: user.id, name: user.name, email: user.email })
    .from(user)
    .where(
      and(eq(user.registrationComplete, true), ne(user.id, userId)),
    );

  return {
    userId,
    team: userTeam,
    members,
    pendingInvitations,
    registeredUsers,
    maxTeamSize: config?.maxTeamSize ?? 4,
    hackathonState: config?.state ?? "pre",
  };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) throw redirect("/login");

  const formData = await request.formData();
  const intent = String(formData.get("intent"));
  const userId = session.user.id;

  switch (intent) {
    case "create-team": {
      const name = String(formData.get("name") ?? "").trim();
      if (!name) return { error: "Team name is required" };

      // Check user not already in a team
      const existing = await db
        .select()
        .from(teamMember)
        .where(eq(teamMember.userId, userId))
        .limit(1);
      if (existing.length > 0) return { error: "You are already on a team" };

      const teamId = randomUUID();
      await db.insert(team).values({ id: teamId, name, ownerId: userId });
      await db.insert(teamMember).values({ teamId, userId });
      return { success: true };
    }

    case "rename-team": {
      const name = String(formData.get("name") ?? "").trim();
      const teamId = String(formData.get("teamId"));
      if (!name) return { error: "Team name is required" };

      const [t] = await db.select().from(team).where(eq(team.id, teamId));
      if (!t || t.ownerId !== userId) return { error: "Not authorized" };

      await db.update(team).set({ name }).where(eq(team.id, teamId));
      return { success: true };
    }

    case "invite-member": {
      const inviteeId = String(formData.get("inviteeId"));
      const teamId = String(formData.get("teamId"));

      const [t] = await db.select().from(team).where(eq(team.id, teamId));
      if (!t || t.ownerId !== userId) return { error: "Not authorized" };

      // Check team size
      const [config] = await db.select().from(hackathonConfig).limit(1);
      const memberCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(teamMember)
        .where(eq(teamMember.teamId, teamId));
      if ((memberCount[0]?.count ?? 0) >= (config?.maxTeamSize ?? 4)) {
        return { error: "Team is full" };
      }

      // Check invitee not already on a team
      const inviteeTeam = await db
        .select()
        .from(teamMember)
        .where(eq(teamMember.userId, inviteeId))
        .limit(1);
      if (inviteeTeam.length > 0)
        return { error: "User is already on a team" };

      // Check no pending invite already
      const existingInvite = await db
        .select()
        .from(invitation)
        .where(
          and(
            eq(invitation.teamId, teamId),
            eq(invitation.inviteeId, inviteeId),
            eq(invitation.status, "pending"),
          ),
        )
        .limit(1);
      if (existingInvite.length > 0)
        return { error: "Invitation already sent" };

      await db.insert(invitation).values({
        id: randomUUID(),
        teamId,
        inviterId: userId,
        inviteeId,
      });
      return { success: true };
    }

    case "accept-invitation": {
      const invitationId = String(formData.get("invitationId"));

      const [inv] = await db
        .select()
        .from(invitation)
        .where(eq(invitation.id, invitationId));
      if (!inv || inv.inviteeId !== userId)
        return { error: "Not authorized" };

      // Check not already on a team
      const existing = await db
        .select()
        .from(teamMember)
        .where(eq(teamMember.userId, userId))
        .limit(1);
      if (existing.length > 0)
        return { error: "You are already on a team" };

      // Check team size
      const [config] = await db.select().from(hackathonConfig).limit(1);
      const memberCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(teamMember)
        .where(eq(teamMember.teamId, inv.teamId));
      if ((memberCount[0]?.count ?? 0) >= (config?.maxTeamSize ?? 4)) {
        return { error: "Team is full" };
      }

      await db
        .update(invitation)
        .set({ status: "accepted" })
        .where(eq(invitation.id, invitationId));
      await db
        .insert(teamMember)
        .values({ teamId: inv.teamId, userId });

      // Decline other pending invitations
      await db
        .update(invitation)
        .set({ status: "declined" })
        .where(
          and(
            eq(invitation.inviteeId, userId),
            eq(invitation.status, "pending"),
          ),
        );

      return { success: true };
    }

    case "decline-invitation": {
      const invitationId = String(formData.get("invitationId"));
      await db
        .update(invitation)
        .set({ status: "declined" })
        .where(
          and(
            eq(invitation.id, invitationId),
            eq(invitation.inviteeId, userId),
          ),
        );
      return { success: true };
    }

    case "remove-member": {
      const memberId = String(formData.get("memberId"));
      const teamId = String(formData.get("teamId"));

      const [t] = await db.select().from(team).where(eq(team.id, teamId));
      if (!t || t.ownerId !== userId) return { error: "Not authorized" };
      if (memberId === userId) return { error: "Cannot remove yourself" };

      await db
        .delete(teamMember)
        .where(
          and(
            eq(teamMember.teamId, teamId),
            eq(teamMember.userId, memberId),
          ),
        );
      return { success: true };
    }

    case "leave-team": {
      const teamId = String(formData.get("teamId"));

      const [t] = await db.select().from(team).where(eq(team.id, teamId));
      if (!t) return { error: "Team not found" };

      // If owner, delete the whole team
      if (t.ownerId === userId) {
        await db.delete(teamMember).where(eq(teamMember.teamId, teamId));
        await db
          .delete(invitation)
          .where(eq(invitation.teamId, teamId));
        await db.delete(team).where(eq(team.id, teamId));
      } else {
        await db
          .delete(teamMember)
          .where(
            and(
              eq(teamMember.teamId, teamId),
              eq(teamMember.userId, userId),
            ),
          );
      }
      return { success: true };
    }

    default:
      return { error: "Unknown action" };
  }
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  const {
    userId,
    team: userTeam,
    members,
    pendingInvitations,
    registeredUsers,
    maxTeamSize,
    hackathonState,
  } = loaderData;
  const actionData = useActionData<typeof action>();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {actionData?.error && (
        <div className="rounded-lg border border-red-400/50 bg-red-400/10 p-4 text-sm text-red-400">
          {actionData.error}
        </div>
      )}

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Pending Invitations</h2>
          {pendingInvitations.map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between rounded-lg border border-(--color-light-30) p-4"
            >
              <div>
                <p className="font-medium">{inv.teamName}</p>
                <p className="text-sm text-(--color-light-50)">
                  Invited by {inv.inviterName}
                </p>
              </div>
              <div className="flex gap-2">
                <Form method="post">
                  <input type="hidden" name="intent" value="accept-invitation" />
                  <input type="hidden" name="invitationId" value={inv.id} />
                  <button
                    type="submit"
                    className="cursor-pointer rounded-lg bg-(--color-compsigh) px-3 py-1 text-sm font-medium text-(--color-dark)"
                  >
                    Accept
                  </button>
                </Form>
                <Form method="post">
                  <input type="hidden" name="intent" value="decline-invitation" />
                  <input type="hidden" name="invitationId" value={inv.id} />
                  <button
                    type="submit"
                    className="cursor-pointer rounded-lg border border-(--color-light-30) px-3 py-1 text-sm"
                  >
                    Decline
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Team Section */}
      {userTeam ? (
        <TeamCard
          team={userTeam}
          members={members}
          userId={userId}
          maxTeamSize={maxTeamSize}
          registeredUsers={registeredUsers}
        />
      ) : (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Create a Team</h2>
          <Form method="post" className="flex gap-3">
            <input type="hidden" name="intent" value="create-team" />
            <input
              name="name"
              type="text"
              placeholder="Team name"
              required
              className="flex-1 rounded-lg border border-(--color-light-30) bg-(--color-dark) px-4 py-2 text-(--color-light) outline-none focus:border-(--color-compsigh)"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-(--color-compsigh) px-6 py-2 font-medium text-(--color-dark) transition-opacity hover:opacity-90"
            >
              Create
            </button>
          </Form>
          <p className="text-sm text-(--color-light-50)">
            Or wait for a team invitation from another participant.
          </p>
        </section>
      )}
    </div>
  );
}
