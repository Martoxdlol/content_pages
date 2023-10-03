import { z } from "zod";

export const pathSegmentRegex = /^[a-z0-9]+[a-z0-9_\-\&\!]*(\/[a-z0-9_\\-\\&\!]+)*$/

const nameOptions = {
    message: "Site name must be between 1 and 255 characters long."
}

export const createPageSchema = z.object({
    name: z.string().min(1, nameOptions).max(255, nameOptions),
    path: z.string().min(1).regex(pathSegmentRegex, {
        message: "Invalid path"
    }),
    siteId: z.string(),
})

export const changePageSchema = z.object({
    id: z.string(),
    name: z.string().min(1, nameOptions).max(255, nameOptions),
    path: z.string().min(1).regex(pathSegmentRegex, {
        message: "Invalid path"
    }),
    siteId: z.string(),
})


export type CreatePageInput = z.infer<typeof createPageSchema>
export type ChangePageInput = z.infer<typeof changePageSchema>