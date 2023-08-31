import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { httpBatchLink } from "@trpc/client";
import { protectedProcedure, publicProcedure, router } from "./trpc";
import { sitesRouter } from "./site/sites-router";

// Add your server procedures here
export const appRouter = router({
    site: sitesRouter,
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