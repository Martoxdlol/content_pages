import { z } from "zod";
import { AsyncReturnType } from "~/lib/utils";
import type { getSiteByIdOf } from "~/services/sites";

// DOMAIN REGEX
// ^(((?!-))(xn--|_)?[a-z0-9-]{0,61}[a-z0-9]{1,1}\.)*(xn--)?([a-z0-9][a-z0-9\-]{0,60}|[a-z0-9-]{1,30}\.[a-z]{2,})$
// https://stackoverflow.com/questions/10306690/what-is-a-regular-expression-which-will-match-a-valid-domain-name-without-a-subd

export const domainSegmentRegex = /^((?!-))(xn--|_)?[a-z0-9-]{0,61}[a-z0-9]{1,1}$/

export type Site = NonNullable<AsyncReturnType<typeof getSiteByIdOf>>

const nameOptions = {
    message: "Site name must be between 1 and 255 characters long."
}

const slugOptions = {
    message: "Site identifier must be between 4 and 55 characters long and can only contain lowercase letters, numbers, and hyphens. You can use punny code to use special characters."
}

export const createSiteSchema = z.object({
    name: z.string().min(1, nameOptions).max(255, nameOptions),
    slug: z.string().regex(domainSegmentRegex, slugOptions).min(4, slugOptions).max(55, slugOptions),
})

export const changeSiteSchema = z.object({
    name: z.string().min(1, nameOptions).max(255, nameOptions),
    slug: z.string().regex(domainSegmentRegex, slugOptions).min(4, slugOptions).max(55, slugOptions),
    id: z.string(),
})

export const pageContentSchema = z.array(z.object({}))

export type CreateSiteInput = z.infer<typeof createSiteSchema>
export type ChangeSiteInput = z.infer<typeof changeSiteSchema>