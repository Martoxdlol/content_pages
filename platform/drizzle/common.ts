import { date, varchar } from "drizzle-orm/mysql-core";

export const schemaCommon = {
    id: varchar('id', { length: 25 }).primaryKey().notNull().unique(),
    updatedAt: date('updated_at').notNull(),
    createdAt: date('created_at').notNull(),
}