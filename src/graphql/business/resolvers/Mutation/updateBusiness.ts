import type { GraphQLContext } from "@/lib/context";
import type {
  MutationResolvers,
  UpdateBusinessInput,
} from "../../../types.generated";

export const updateBusiness: NonNullable<
  MutationResolvers["updateBusiness"]
> = async (
  _parent,
  _arg: { input: UpdateBusinessInput },
  _ctx: GraphQLContext,
) => {
  const { user, prisma } = _ctx;
  const { input } = _arg;

  const updatedBusiness = await prisma.business.update({
    data: {
      name: input.name ?? undefined,
      description: input.description,
      tags: input.tags ?? undefined,
    },
    where: { userId: user.id },
  });

  return updatedBusiness;
};
