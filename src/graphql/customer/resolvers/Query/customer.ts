import { GraphQLContext } from '@/lib/context';
import type { QueryResolvers } from './../../../types.generated';

export const customer: NonNullable<QueryResolvers['customer']> = async (
	_parent,
	_arg,
	_ctx: GraphQLContext,
) => {
	const { user, prisma } = _ctx;

	const foundCustomer = await prisma.customer.findUniqueOrThrow({
		where: { userId: user.id },
	});

	return foundCustomer;
};
