import { Elysia, Context } from "elysia";
import { auth } from "./lib/auth";
import cors from "@elysiajs/cors";
import apollo from "@elysiajs/apollo";
import { schema, resolvers } from "./graphql";
import { GraphQLError } from "graphql";

const app = new Elysia()
  .use(cors())
  .mount(auth.handler)
  .use(
    apollo({
      typeDefs: schema,
      resolvers,
      context: async ({ request: { headers } }: Context) => {
        const session = await auth.api.getSession({ headers });
        if (!session)
          throw new GraphQLError("Unauthorized", {
            extensions: { code: "UNAUTHENTICATED" },
          });

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
