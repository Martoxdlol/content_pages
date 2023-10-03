import { z } from "zod";

export const destinonSchema = z.object({
    type: z.enum(["page", "external"]),
    new_tab: z.boolean().optional(),
    src: z.string(),
    section_id: z.string().optional(),
})

export type Destination = z.infer<typeof destinonSchema>

export function urlOf(destination: Destination) {
    return destination.src
}