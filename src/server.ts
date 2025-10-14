import { Elysia } from "elysia";
import { yoga } from "@elysiajs/graphql-yoga";
import { typeDefs } from "./graphql/schemas";
import { resolvers } from "./graphql/resolvers";
import { GraphQLContext } from "./lib/context";
import prisma from "@/lib/prisma";

const createContext = async (): Promise<GraphQLContext> => {
  return { prisma };
};

const app = new Elysia()
  .use(
    yoga({
      typeDefs,
      resolvers,
      context: createContext,
    })
  )
  .listen(3000);
