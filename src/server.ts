import { Elysia, Context } from "elysia";
import { auth } from "./lib/auth";
import cors from "@elysiajs/cors";
import apollo from "@elysiajs/apollo";
import { schema, resolvers } from "./graphql";

const app = new Elysia()
  .use(cors())
  .mount(auth.handler)
  .use(
    apollo({
      typeDefs: schema,
      resolvers,
      context: async ({ status, request: { headers } }: Context) => {
        const session = await auth.api.getSession({
          headers,
        });
        console.log("I am here");
        if (!session) return status(401);

        return {
          user: session.user,
          session: session.session,
        };
      },
    })
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
