import { TRPCError } from "@trpc/server"
import { and, eq } from "drizzle-orm"
import { createId, database, schema } from "~/server/db"
import { ChangePageInput, CreatePageInput } from "~/types/page"
import { userCanCreatePage } from "./sites"

export async function getPagesOfSite(siteId: string) {
    return database.query.page.findMany({
        where: eq(schema.page.siteId, siteId)
    })
}

export type Pages = Awaited<ReturnType<typeof getPagesOfSite>>

export async function getPageById(id: string, userId: string) {
    // TODO: Check permission using userId
    return database.query.page.findFirst({
        where: eq(schema.page.id, id)
    })
}

export type Page = NonNullable<Awaited<ReturnType<typeof getPageById>>>

export async function createPage(input: CreatePageInput, userId: string) {
    const now = new Date()

    const id = createId()

    if(!await userCanCreatePage(input.siteId, userId)) {
        throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You do not have permission to create pages on this site.'
        })
    }

    try {
        await database.insert(schema.page).values({
            createdAt: now,
            updatedAt: now,
            id,
            name: input.name,
            siteId: input.siteId,
            path: input.path,
        }).execute()
        return {
            id
        }
    } catch (error: any) {
        if (error.message.includes('code = AlreadyExists')) {
            throw new TRPCError({
                code: 'CONFLICT',
                message: 'Site identifier already in use.'
            })
        }
        throw error
    }
}

export async function changePage(input: ChangePageInput, userId: string) {
    const now = new Date()

    try {
        return await database.update(schema.page).set({
            updatedAt: now,
            name: input.name,
            path: input.path,
        }).where(and(eq(schema.site.ownerId, userId), eq(schema.site.id, input.id))).execute()
    } catch (error: any) {
        if (error.message.includes('code = AlreadyExists')) {
            throw new TRPCError({
                code: 'CONFLICT',
                message: 'Page path already in use.'
            })
        }
        throw error
    }
}
