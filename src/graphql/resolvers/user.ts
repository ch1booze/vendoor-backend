import { GraphQLContext } from "@/lib/context";

export const userResolvers = {
  Query: {
    getUsers: async (_, __, context: GraphQLContext) => {
      return context.prisma.user.findMany();
    },
    getUserByID: async (_, { id }, context: GraphQLContext) => {
      return context.prisma.user.findUnique({ where: { id } });
    },
    getUserByEmail: async (_, { email }, context: GraphQLContext) => {
      return context.prisma.user.findUnique({ where: { email } });
    },
  },
  Mutation: {
    createUser: async (_, { input }, context: GraphQLContext) => {
      return context.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
    },
    updateUser: async (_, { id, input }, context: GraphQLContext) => {
      return context.prisma.user.update({
        where: { id },
        data: {
          name: input.name,
          email: input.email,
        },
      });
    },
    deleteUser: async (_, { id }, context: GraphQLContext) => {
      return context.prisma.user.delete({ where: { id } });
    },
  },
};
