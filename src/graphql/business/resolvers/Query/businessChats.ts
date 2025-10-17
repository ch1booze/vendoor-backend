import { GraphQLContext } from "@/lib/context";
import type { BusinessChat, QueryResolvers } from "./../../../types.generated";

export const businessChats: NonNullable<QueryResolvers['businessChats']> = async (_parent, _arg, _ctx: GraphQLContext) => {
  const { user, prisma } = _ctx;

  const foundBusinessChats = await prisma.businessChat.findMany({
    where: { business: { userId: user.id } },
  });

  return foundBusinessChats as BusinessChat[];
};
