import { GraphQLContext } from "@/lib/context";
import type { Business, QueryResolvers } from "./../../../types.generated";

export const business: NonNullable<QueryResolvers['business']> = async (
  _parent,
  _arg,
  _ctx: GraphQLContext
) => {
  const { user, prisma } = _ctx;
  const foundBusiness = await prisma.business.findUnique({
    where: { userId: user.id },
  });

  return foundBusiness as Business;
};
