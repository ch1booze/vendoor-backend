import type { GraphQLContext } from '@/lib/context';
import type { MutationResolvers } from './../../../types.generated';
import { OrderStatus } from '@/graphql/order/types';

export const cancelCustomerOrder: NonNullable<
	MutationResolvers['cancelCustomerOrder']
> = async (_parent, _arg: { orderId: string }, _ctx: GraphQLContext) => {
	const { user, prisma } = _ctx;
	const { orderId } = _arg;

	const updatedOrder = await prisma.order.update({
		data: { status: OrderStatus.CANCELLED },
		where: { id: orderId, customer: { userId: user.id } },
	});

	return !!updatedOrder;
};
