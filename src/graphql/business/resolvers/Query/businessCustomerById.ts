import type { GraphQLContext } from "@/lib/context";
import type { Customer, QueryResolvers } from "./../../../types.generated";

export const businessCustomerById: NonNullable<
  QueryResolvers["businessCustomerById"]
> = async (_parent, _arg: { customerId: string }, _ctx: GraphQLContext) => {
  const { user, prisma } = _ctx;
  const { customerId } = _arg;

  const foundCustomer = await prisma.customer.findUniqueOrThrow({
    where: { userId: customerId, businesses: { some: { userId: user.id } } },
  });

  return foundCustomer;
};
