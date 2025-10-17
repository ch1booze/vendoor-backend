import { Context } from "elysia";
import { auth } from "./auth";
import { PrismaClient } from "@prisma/client";
import prisma from "./prisma";

export type SessionUser = (typeof auth.$Infer.Session)["user"];

export type GraphQLContext = { user?: SessionUser; prisma: PrismaClient };

export const createContext = async ({
  request: { headers },
}: Context): Promise<GraphQLContext> => {
  const session = await auth.api.getSession({ headers });
  return { user: session?.user, prisma };
};
