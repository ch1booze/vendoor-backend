import type { GraphQLContext } from '@/lib/context';
import type { Customer, QueryResolvers } from './../../../types.generated';

export const businessCustomers: NonNullable<
	QueryResolvers['businessCustomers']
> = async (_parent, _arg, _ctx: GraphQLContext) => {
	const { user, prisma } = _ctx;

	const foundCustomers = await prisma.customer.findMany({
		where: { businesses: { some: { userId: user.id } } },
	});

	return foundCustomers as Customer[];
};
