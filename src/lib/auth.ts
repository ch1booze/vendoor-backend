import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { Elysia } from "elysia";
import { env } from "./environment";
import { bearer, openAPI } from "better-auth/plugins";

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
