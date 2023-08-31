import { changeSiteSchema, createSiteSchema } from "~/types/site";
import { protectedProcedure, router } from "../trpc";
import { changeSite, createSite } from "~/services/sites";

export const sitesRouter = router({
    create: protectedProcedure.input(createSiteSchema).mutation(async ({ ctx: { session }, input }) => {
        await createSite(input, session.user.id)
    }),
    change: protectedProcedure.input(changeSiteSchema).mutation(async ({ ctx: { session }, input }) => {
        await changeSite(input, session.user.id)
    })
})