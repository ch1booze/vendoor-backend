import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { Context, Elysia } from "elysia";
import { env } from "./environment";
import { bearer, openAPI } from "better-auth/plugins";
import { GraphQLError } from "graphql";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true, requireEmailVerification: true },
  user: {
    fields: { name: "fullName" },
    additionalFields: { role: { type: "string", required: true } },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [bearer(), openAPI()],
});

export const createContext = async ({ request: { headers } }: Context) => {
  const session = await auth.api.getSession({ headers });
  if (!session)
    throw new GraphQLError("Unauthorized", {
      extensions: { code: "UNAUTHENTICATED" },
    });

  return session.user;
};

export type SessionUser = (typeof auth.$Infer.Session)["user"];
