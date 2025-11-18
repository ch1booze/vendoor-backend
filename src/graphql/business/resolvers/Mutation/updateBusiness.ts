import type { GraphQLContext } from '@/lib/context';
import type {
	Business,
	MutationResolvers,
	UpdateBusinessInput,
} from '../../../types.generated';

export const updateBusiness: NonNullable<
	MutationResolvers['updateBusiness']
> = async (
	_parent,
	_arg: { input: UpdateBusinessInput },
	_ctx: GraphQLContext,
) => {
	const { user, prisma } = _ctx;
	const { input } = _arg;

	const updatedBusiness = await prisma.business.update({
		data: {
			name: input.name,
			description: input.description,
			tags: input.tags,
		},
		where: { userId: user.id },
	});

	return updatedBusiness as Business;
};
