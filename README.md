# NextJS with Auth, TRPc, Tailwind, shadcn/ui and using App Router.

## Project Struncture

`/app` app router entrypoint. See [App Router Documentation](https://nextjs.org/docs/app/building-your-application/routing)

`/server` all server code.

`/server/index` entrypoint for defining server procedures.

`/server/auth` auth config and functions.

`/server/db` database configuration.

`/server/trpc` trpc procedures definition.

`/pages/` legacy Pages Router, only used for next-auth, do not use it for anything else!

`/lib/client` client entrypoint for calling server procedures (using the `api` object)

`/drizzle` all database schemas using drizzle orm

`/components/ui` shadcn/ui components
`/components` components specific for the app

## Call api (server procedures) from the code

Example: query the message from the server (GET)

```tsx
// Use inside a React component

const { data: message } = api.message.useQuery();

return <p>{message}</p>;
```

Example: excecute a mutation (POST)

```tsx
// Use inside a React component
const { mutateAsync: createSomething } = api.createSomething.useQuery();

async function handleCreate() {
  try {
    const something = await createSomething({ name: "something" });
  } catch (error) {
    console.error(error);
  }
}

return <button onClick={handleCreate}>Create</button>;
```

## Using the database

See [drizzle-orm](https://orm.drizzle.team/docs/quick-start)

See [Table schemas](https://orm.drizzle.team/docs/schemas)

See [Querying with SQL-like syntax [CRUD]](https://orm.drizzle.team/docs/crud)

Example:

```tsx
import { eq } from "drizzle-orm";
import { database, schema } from '~/server/db';

const user = await database.query.users.findFirst({
  where: eq(schema.users.email, 'user@gmail.com')
})

const user2 = await database.select({
  name: schema.users.name,
  id: schema.users.id, email: schema.users.email
}).from(schema.users).where(eq(schema.users.email, 'user2@gmail.com'))

```
