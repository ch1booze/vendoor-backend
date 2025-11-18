import type { GraphQLContext } from '@/lib/context';
import type {
	BusinessChat,
	MutationResolvers,
} from './../../../types.generated';

export const createBusinessChat: NonNullable<
	MutationResolvers['createBusinessChat']
> = async (_parent, _arg: { query: string }, _ctx: GraphQLContext) => {
	const { user, prisma } = _ctx;
	const { query } = _arg;

	const createdBusinessChat = await prisma.businessChat.create({
		data: {
			query,
			reply: 'YOUR REPLY GOES HERE',
			business: { connect: { userId: user.id } },
		},
	});

	return createdBusinessChat as BusinessChat;
};
