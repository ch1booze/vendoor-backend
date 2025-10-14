import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

export const businessResolvers = {
  Query: {
    getBusiness: async (
      _parent: unknown,
      _args: {},
      { user }: { user: { id: string } }
    ) => {
      return prisma.business.findUnique({
        where: { userId: user.id },
      });
    },
  },
  Mutation: {
    createBusiness: async (
      _parent: unknown,
      args: { input: any },
      { user }: { user: { id: string } }
    ) => {
      return prisma.business.create({
        data: {
          userId: user.id,
          ...args.input,
        },
      });
    },
    updateBusiness: async (
      _parent: unknown,
      args: { input: any },
      { user }: { user: { id: string } }
    ) => {
      return prisma.business.update({
        where: { userId: user.id },
        data: args.input,
      });
    },
    deleteBusiness: async (
      _parent: unknown,
      _args: {},
      { user }: { user: { id: string } }
    ) => {
      await prisma.business.delete({
        where: { userId: user.id },
      });
      return true;
    },
  },
};
