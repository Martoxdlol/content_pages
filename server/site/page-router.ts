import { protectedProcedure, router } from "../trpc";
import { changePageSchema, createPageSchema } from "~/types/page";
import { changePage, createPage } from "~/services/pages";

export const pagesRouter = router({
    create: protectedProcedure.input(createPageSchema).mutation(async ({ ctx: { session }, input }) => {
        return await createPage(input, session.user.id)
    }),
    change: protectedProcedure.input(changePageSchema).mutation(async ({ ctx: { session }, input }) => {
        await changePage(input, session.user.id)
    })
})