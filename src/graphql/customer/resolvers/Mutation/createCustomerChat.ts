import { GraphQLContext } from "@/lib/context";
import type {
  CreateCustomerChatInput,
  MutationResolvers,
} from "./../../../types.generated";

export const createCustomerChat: NonNullable<
  MutationResolvers["createCustomerChat"]
> = async (
  _parent,
  _arg: { input: CreateCustomerChatInput },
  _ctx: GraphQLContext,
) => {
  const { user, prisma } = _ctx;
  const { input } = _arg;

  const createdCustomerChat = await prisma.customerChat.create({
    data: {
      query: input.query,
      reply: "REPLY GOES HERE",
      businessId: input.businessId,
      
    },
    include: { customer: true, business: true },
  });

  return createdCustomerChat;
};
