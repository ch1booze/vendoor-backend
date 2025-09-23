import { betterAuth } from 'better-auth';
import { magicLink, openAPI, phoneNumber } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { env } from './environment';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true, requireEmailVerification: true },
  user: {
    fields: { name: 'fullName' },
    additionalFields: { role: { type: 'string', required: true } },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    phoneNumber({
      sendOTP: ({ phoneNumber, code }) => {
        console.log(`Sending ${code} to ${phoneNumber}`);
      },
    }),
    magicLink({
      sendMagicLink: ({ email, url }) => {
        console.log(`Sending ${url} to ${email}`);
      },
    }),
    openAPI(),
  ],
});
