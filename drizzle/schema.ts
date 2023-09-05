import { relations } from "drizzle-orm";
import { json, mysqlTable, unique, varchar } from "drizzle-orm/mysql-core";
import { schemaCommon } from "./common";
import { pageContentSchema } from "~/types/site";
import { z } from "zod";

export * from './next-auth-schema'

export const site = mysqlTable("site", {
    ...schemaCommon,

    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),

    ownerId: varchar("owner", { length: 255 }).notNull(),
})

export const page = mysqlTable("page", {
    ...schemaCommon,

    name: varchar("name", { length: 255 }).notNull(),
    path: varchar("path", { length: 255 }).notNull(),

    content: json("content").notNull().$type<z.infer<typeof pageContentSchema>>().default([]),

    siteId: varchar("site", { length: 255 }).notNull(),
}, (t) => ({
    unique_path: unique().on(t.path, t.siteId),
})) 