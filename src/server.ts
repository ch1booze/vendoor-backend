import { Elysia } from "elysia";
import { auth } from "./lib/auth";
import cors from "@elysiajs/cors";
import apollo from "@elysiajs/apollo";
import schema from "./graphql/schema.merged";
import { createContext } from "./lib/context";

const app = new Elysia()
  .use(cors())
  .mount(auth.handler)
  .use(
    apollo({
      schema,
      context: createContext,
    })
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
