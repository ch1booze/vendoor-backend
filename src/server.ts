import { Elysia } from "elysia";
import { auth, createContext } from "./lib/auth";
import cors from "@elysiajs/cors";
import apollo from "@elysiajs/apollo";
import { typeDefs } from './graphql/typeDefs.generated'
import { resolvers } from './graphql/resolvers.generated'


const app = new Elysia()
  .use(cors())
  .mount(auth.handler)
  .use(
    apollo({
      typeDefs,
      resolvers,
      context: createContext,
    })
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
