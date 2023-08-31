import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { createId, database, schema } from "~/server/db";
import { ChangeSiteInput, CreateSiteInput } from "~/types/site";

export function getSitesOf(userId: string) {
    return database.query.site.findMany({
        where: eq(schema.site.ownerId, userId)
    })
}

export function getSiteByIdOf(userId: string, id: string) {
    return database.query.site.findFirst({
        where: and(eq(schema.site.ownerId, userId), eq(schema.site.id, id)),
    })
}

export async function createSite(input: CreateSiteInput, userId: string) {
    const now = new Date()

    try {
        return await database.insert(schema.site).values({
            createdAt: now,
            updatedAt: now,
            id: createId(),
            name: input.name,
            ownerId: userId,
            slug: input.slug,
        }).execute()
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

export async function changeSite(input: ChangeSiteInput, userId: string) {
    const now = new Date()

    try {
        return await database.update(schema.site).set({
            updatedAt: now,
            name: input.name,
            slug: input.slug,
        }).where(and(eq(schema.site.ownerId, userId), eq(schema.site.id, input.id))).execute()
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