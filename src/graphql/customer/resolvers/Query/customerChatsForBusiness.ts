import { GraphQLContext } from '@/lib/context';
import type { QueryResolvers } from './../../../types.generated';

export const customerChatsForBusiness: NonNullable<
	QueryResolvers['customerChatsForBusiness']
> = async (_parent, _arg: { businessId: string }, _ctx: GraphQLContext) => {
	const { prisma } = _ctx;

	const foundCustomerChats = await prisma.customerChat.findMany({
		where: { businessId: _arg.businessId },
		include: {
			customer: true,
			business: true,
		},
	});

	return foundCustomerChats;
};
