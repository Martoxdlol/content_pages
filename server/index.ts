import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { httpBatchLink } from "@trpc/client";
import { protectedProcedure, publicProcedure, router } from "./trpc";

// Add your server procedures here
export const appRouter = router({
    time: publicProcedure.query(() => {
        return new Date().toTimeString();
    }),
    message: protectedProcedure.query(async ({ ctx: { session } }) => {
        return `Hi ${session?.user.name}, your email is ${session?.user.email}`;
    })
});

export type AppRouter = typeof appRouter;

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

/**
 * Call api from server
 */
export const serverClient = appRouter.createCaller({
    links: [
        httpBatchLink({
            url: "http://localhost:3000/api/trpc",
        }),
    ],
});