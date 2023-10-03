import { env } from "~/env.mjs";
import { connect } from "@planetscale/database";
import { nanoid } from 'nanoid';
import { drizzle } from "drizzle-orm/planetscale-serverless";
import * as schema from '~/drizzle/schema';

export function generateId() {
  return nanoid()
}

export const connection = connect({
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD
});

export { schema }

export const database = drizzle(connection, { schema })

export function createId() {
  return nanoid()
}