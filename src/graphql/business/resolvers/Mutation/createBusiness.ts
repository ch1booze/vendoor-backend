import type { GraphQLContext } from '@/lib/context';
import type {
	CreateBusinessInput,
	MutationResolvers,
} from '../../../types.generated';

export const createBusiness: NonNullable<
	MutationResolvers['createBusiness']
> = async (
	_parent,
	_arg: { input: CreateBusinessInput },
	_ctx: GraphQLContext,
) => {
	const { user, prisma } = _ctx;
	const { input } = _arg;

	const createdBusiness = await prisma.business.create({
		data: {
			name: input.name,
			description: input.description,
			tags: input.tags,
			userId: user.id,
		},
	});

	return createdBusiness;
};
