import type { GraphQLContext } from '@/lib/context';
import type {
	CreateCustomerOrderInput,
	MutationResolvers,
} from './../../../types.generated';
import { type CreateOrderItemBody, OrderStatus } from '../../types';

export const createCustomerOrder: NonNullable<
	MutationResolvers['createCustomerOrder']
> = async (
	_parent,
	_arg: { input: CreateCustomerOrderInput },
	_ctx: GraphQLContext,
) => {
	const { user, prisma } = _ctx;
	const { input } = _arg;

	// Deduplicate order items
	const orderItems: Record<string, CreateOrderItemBody> = {};
	for (const item of input.items) {
		if (item.productId in orderItems) {
			orderItems[item.productId].quantity += item.quantity;
		} else {
			const foundProduct = await prisma.product.findUniqueOrThrow({
				where: { id: item.productId },
				select: {
					name: true,
					price: true,
					unit: true,
					tags: true,
					stock: true,
				},
			});
			orderItems[item.productId] = { quantity: item.quantity, ...foundProduct };
		}
	}

	const createdOrder = await prisma.order.create({
		data: {
			customer: { connect: { userId: user.id } },
			businessId: input.businessId,
			status: OrderStatus.PENDING,
			items: {
				createMany: {
					data: Object.entries(orderItems).map(([productId, body]) => ({
						productId,
						...body,
					})),
				},
			},
		},
		include: { business: true, customer: true, items: true },
	});

	return createdOrder;
};
