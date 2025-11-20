import type { GraphQLContext } from '@/lib/context';
import type { MutationResolvers } from './../../../types.generated';

export const registerCustomer: NonNullable<
	MutationResolvers['registerCustomer']
> = async (_parent, _arg, _ctx: GraphQLContext) => {
	const { user, prisma } = _ctx;
	const createdCustomer = await prisma.customer.create({
		data: { userId: user.id },
	});

	return createdCustomer;
};
