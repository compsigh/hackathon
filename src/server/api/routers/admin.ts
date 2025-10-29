import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  getAllUsers: protectedProcedure
    .query(async ({ ctx }) => {
      // Check if user is admin
      if (!ctx.session.user.isAdmin) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can access this resource",
        });
      }

      const users = await ctx.db.user.findMany({
        orderBy: { email: "asc" },
        include: {
          team: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return users;
    }),
});

