import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
        graduatingClass: z.enum(["CO2029", "CO2028", "CO2027", "CO2026", "CO2025", "MASTERS"]),
      })
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
    });

    return user;
  }),
});

