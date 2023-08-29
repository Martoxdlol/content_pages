import { TRPCError, initTRPC } from "@trpc/server";
import { serverSession } from "./auth";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
    const session = await serverSession()
    
    if (!session) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to do this",
        });
    }

    return next({
        ctx: {
            ...ctx,
            session,
        }
    });
});