import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { env } from "./environment";
import { apiKey, bearer, openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  user: {
    fields: { name: "fullName" },
    additionalFields: { role: { type: "string", required: true } },
  },
  plugins: [bearer(), openAPI(), apiKey()],
});
