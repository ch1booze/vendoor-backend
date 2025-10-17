import { GraphQLContext } from "@/lib/context";
import type { Business, QueryResolvers } from "./../../../types.generated";

export const businessById: NonNullable<QueryResolvers['businessById']> = async (
  _parent,
  _arg: { businessId: string },
  _ctx: GraphQLContext
) => {
  const { prisma } = _ctx;
  const { businessId } = _arg;

  const foundBusiness = await prisma.business.findUnique({
    where: { id: businessId },
  });

  return foundBusiness as Business;
};
