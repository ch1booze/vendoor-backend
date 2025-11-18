import type { GraphQLContext } from '@/lib/context';
import type { Business, QueryResolvers } from './../../../types.generated';

export const business: NonNullable<QueryResolvers['business']> = async (
	_parent,
	_arg,
	_ctx: GraphQLContext,
) => {
	const { user, prisma } = _ctx;
	const foundBusiness = await prisma.business.findUniqueOrThrow({
		where: { userId: user.id },
	});

    return foundBusiness;
};
