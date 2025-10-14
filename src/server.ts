import { Elysia } from "elysia";
import { auth, createContext } from "./lib/auth";
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
      context: createContext,
    })
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
