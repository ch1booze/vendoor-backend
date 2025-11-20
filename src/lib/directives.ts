import { gql } from '@elysiajs/apollo';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import {
	defaultFieldResolver,
	GraphQLError,
	type GraphQLSchema,
} from 'graphql';

export function authDirective(directiveName: string = 'auth') {
	return {
		authDirectiveTypeDefs: gql`
      directive @${directiveName}(role: Role) on OBJECT | FIELD_DEFINITION

      enum Role {
        BUSINESS
        CUSTOMER
      }
    `,
		authDirectiveTransformer: (schema: GraphQLSchema) =>
			mapSchema(schema, {
				[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
					const authDirective = getDirective(
						schema,
						fieldConfig,
						directiveName,
					)?.[0];
					if (authDirective) {
						const { role } = authDirective;
						if (role) {
							const { resolve = defaultFieldResolver } = fieldConfig;
							fieldConfig.resolve = (source, args, context, info) => {
								const isAuthorized = context?.user?.role === role;
								if (!isAuthorized) {
									throw new GraphQLError('Unauthorized', {
										extensions: { code: 'FORBIDDEN' },
									});
								}

								return resolve(source, args, context, info);
							};

							return fieldConfig;
						}
					}
				},
			}),
	};
}
