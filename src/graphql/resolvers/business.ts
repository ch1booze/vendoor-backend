import { SessionUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Role, roleGuard } from "@/lib/roles";

export const businessResolvers = {
  Query: {
    getBusiness: async (_parent: unknown, _args: {}, user: SessionUser) => {
      roleGuard(user.role, Role.BUSINESS);

      return prisma.business.findUnique({
        where: { userId: user.id },
      });
    },
  },
  Mutation: {
    createBusiness: async (
      _parent: unknown,
      args: { input: any },
      user: SessionUser
    ) => {
      roleGuard(user.role, Role.BUSINESS);

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
      user: SessionUser
    ) => {
      roleGuard(user.role, Role.BUSINESS);

      return prisma.business.update({
        where: { userId: user.id },
        data: args.input,
      });
    },
    deleteBusiness: async (_parent: unknown, _args: {}, user: SessionUser) => {
      roleGuard(user.role, Role.BUSINESS);

      await prisma.business.delete({
        where: { userId: user.id },
      });
      return true;
    },
  },
};
