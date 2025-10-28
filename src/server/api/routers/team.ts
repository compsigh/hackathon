import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const teamRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // Check if user already has a team
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        include: { team: true },
      });

      if (user?.teamId) {
        throw new Error("User is already in a team");
      }

      // Check if team name already exists
      const existingTeam = await ctx.db.team.findFirst({
        where: { name: input.name },
      });

      if (existingTeam) {
        throw new Error("Team name already taken");
      }

      return await ctx.db.team.create({
        data: {
          name: input.name,
          members: {
            connect: { id: ctx.session.user.id },
          },
        },
        include: {
          members: true,
          project: true,
        },
      });
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.team.findUnique({
        where: { id: input.id },
        include: {
          members: true,
          project: true,
        },
      });
    }),

  getByName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.team.findFirst({
        where: { name: input.name },
        include: {
          members: true,
          project: true,
        },
      });
    }),

  getMyTeam: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        team: {
          include: {
            members: true,
            project: true,
          },
        },
      },
    });

    return user?.team;
  }),

  updateName: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (!user?.teamId) {
        throw new Error("User is not in a team");
      }

      // Check if team name already exists (excluding current team)
      const existingTeam = await ctx.db.team.findFirst({
        where: {
          name: input.name,
          id: { not: user.teamId },
        },
      });

      if (existingTeam) {
        throw new Error("Team name already taken");
      }

      return await ctx.db.team.update({
        where: { id: user.teamId },
        data: { name: input.name },
      });
    }),

  leave: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { team: true },
    });

    if (!user?.teamId) {
      throw new Error("You are not in a team");
    }

    // Get the team with all members
    const team = await ctx.db.team.findUnique({
      where: { id: user.teamId },
      include: { members: true },
    });

    if (!team) {
      throw new Error("Team not found");
    }

    // If this is the last member, delete the team
    if (team.members.length === 1) {
      await ctx.db.team.delete({
        where: { id: user.teamId },
      });
      return { success: true, teamDeleted: true };
    }

    // Otherwise, just remove the user from the team
    await ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: { teamId: null },
    });

    return { success: true, teamDeleted: false };
  }),

  getAllMembers: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
    });

    if (!user?.teamId) {
      return [];
    }

    const team = await ctx.db.team.findUnique({
      where: { id: user.teamId },
      include: { members: true },
    });

    return team?.members ?? [];
  }),

  // Invite functionality
  createInvite: protectedProcedure
    .input(
      z.object({
        toUserId: z.string(),
        message: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the sender is in a team
      const sender = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (!sender?.teamId) {
        throw new Error("You must be in a team to send invites");
      }

      // Check if the receiver exists and is not in a team
      const receiver = await ctx.db.user.findUnique({
        where: { id: input.toUserId },
      });

      if (!receiver) {
        throw new Error("User not found");
      }

      if (receiver.teamId) {
        throw new Error("User is already in a team");
      }

      // Check if there's already a pending invite
      const existingInvite = await ctx.db.invite.findUnique({
        where: {
          toUserId_teamId: {
            toUserId: input.toUserId,
            teamId: sender.teamId,
          },
        },
      });

      if (existingInvite && existingInvite.status === "PENDING") {
        throw new Error("Invite already sent");
      }

      return await ctx.db.invite.create({
        data: {
          fromUserId: ctx.session.user.id,
          toUserId: input.toUserId,
          teamId: sender.teamId,
          message: input.message,
        },
        include: {
          fromUser: true,
          toUser: true,
          team: true,
        },
      });
    }),

  acceptInvite: protectedProcedure
    .input(z.object({ inviteId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Get the invite
      const invite = await ctx.db.invite.findUnique({
        where: { id: input.inviteId },
      });

      if (!invite) {
        throw new Error("Invite not found");
      }

      // Check if the invite is for the current user
      if (invite.toUserId !== ctx.session.user.id) {
        throw new Error("This invite is not for you");
      }

      // Check if the invite is still pending
      if (invite.status !== "PENDING") {
        throw new Error("This invite has already been responded to");
      }

      // Check if user is already in a team
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (user?.teamId) {
        throw new Error("You are already in a team");
      }

      // Accept the invite and add user to team
      await ctx.db.invite.update({
        where: { id: input.inviteId },
        data: { status: "ACCEPTED" },
      });

      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { teamId: invite.teamId },
      });

      return { success: true };
    }),

  declineInvite: protectedProcedure
    .input(z.object({ inviteId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Get the invite
      const invite = await ctx.db.invite.findUnique({
        where: { id: input.inviteId },
      });

      if (!invite) {
        throw new Error("Invite not found");
      }

      // Check if the invite is for the current user
      if (invite.toUserId !== ctx.session.user.id) {
        throw new Error("This invite is not for you");
      }

      // Check if the invite is still pending
      if (invite.status !== "PENDING") {
        throw new Error("This invite has already been responded to");
      }

      // Decline the invite
      return await ctx.db.invite.update({
        where: { id: input.inviteId },
        data: { status: "DECLINED" },
      });
    }),

  getPendingInvites: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.invite.findMany({
      where: {
        toUserId: ctx.session.user.id,
        status: "PENDING",
      },
      include: {
        fromUser: true,
        team: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getSentInvites: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.invite.findMany({
      where: {
        fromUserId: ctx.session.user.id,
      },
      include: {
        toUser: true,
        team: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
