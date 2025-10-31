import { adminRouter } from "~/server/api/routers/admin";
import { participantRouter } from "~/server/api/routers/participant";
import { statsRouter } from "~/server/api/routers/stats";
import { teamRouter } from "~/server/api/routers/team";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  participant: participantRouter,
  team: teamRouter,
  stats: statsRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
