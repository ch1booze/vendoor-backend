import { readFileSync } from "fs";
import { Elysia } from "elysia";
import { auth, createContext } from "./lib/auth";
import cors from "@elysiajs/cors";
import apollo from "@elysiajs/apollo";
import resolvers from "./resolvers";

const typeDefs = readFileSync("./src/graphql/schema.gql", "utf-8");

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
