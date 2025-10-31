import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const participantRouter = createTRPCRouter({
  updateName: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { name: input.name },
      });
    }),

  updatePreferredName: protectedProcedure
    .input(z.object({ preferredName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { preferredName: input.preferredName },
      });
    }),

  updateGraduatingClass: protectedProcedure
    .input(
      z.object({
        graduatingClass: z.enum([
          "CO2029",
          "CO2028",
          "CO2027",
          "CO2026",
          "CO2025",
          "MASTERS",
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { graduatingClass: input.graduatingClass },
      });
    }),

  updateAttended: protectedProcedure
    .input(z.object({ attended: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { attended: input.attended },
      });
    }),

  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        referredBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return user;
  }),

  markParticipantPageVisited: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
    });

    if (user && !user.hasVisitedParticipantPage) {
      return await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { hasVisitedParticipantPage: true },
      });
    }

    return user;
  }),

  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    const allUsers = await ctx.db.user.findMany({
      where: {
        id: { not: ctx.session.user.id },
        email: { not: null },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return allUsers.map((user) => {
      const emailPrefix = user.email?.split("@")[0] ?? "";
      return {
        id: user.id,
        name: user.name,
        emailPrefix,
      };
    });
  }),

  updateReferral: protectedProcedure
    .input(z.object({ referralId: z.string().nullable() }))
    .mutation(async ({ ctx, input }) => {
      if (input.referralId === ctx.session.user.id) {
        throw new Error("Cannot refer yourself");
      }

      if (input.referralId) {
        const referralUser = await ctx.db.user.findUnique({
          where: { id: input.referralId },
        });
        if (!referralUser) {
          throw new Error("Referral user not found");
        }
      }

      return await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { referralId: input.referralId },
      });
    }),

  getReferralStats: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        referrals: {
          select: {
            id: true,
          },
        },
        referredBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      referralCount: user?.referrals.length ?? 0,
      referredBy: user?.referredBy
        ? {
            id: user.referredBy.id,
            name: user.referredBy.name,
            emailPrefix: user.referredBy.email?.split("@")[0] ?? "",
          }
        : null,
    };
  }),
});
