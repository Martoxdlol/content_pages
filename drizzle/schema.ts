import { relations } from "drizzle-orm";
import { json, mysqlTable, unique, varchar } from "drizzle-orm/mysql-core";
import { schemaCommon } from "./common";

export * from './next-auth-schema'

export const site = mysqlTable("site", {
    ...schemaCommon,

    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),

    owner: varchar("owner", { length: 255 }).notNull(),
})