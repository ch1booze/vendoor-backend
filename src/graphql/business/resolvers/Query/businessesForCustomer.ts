import type { GraphQLContext } from '@/lib/context';
import type { Business, QueryResolvers } from './../../../types.generated';

export const businessesForCustomer: NonNullable<
	QueryResolvers['businessesForCustomer']
> = async (_parent, _arg, _ctx: GraphQLContext) => {
	const { prisma } = _ctx;

	const foundBusinesses = await prisma.business.findMany();

	return foundBusinesses;
};
