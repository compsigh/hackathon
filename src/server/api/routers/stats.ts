import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const statsRouter = createTRPCRouter({
  getRegisteredCount: publicProcedure.query(async ({ ctx }) => {
    const count = await ctx.db.user.count();
    return { count };
  }),
});
