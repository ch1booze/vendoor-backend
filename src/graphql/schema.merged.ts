import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers.generated";
import { authDirective } from "@/lib/directives";
import { typeDefs } from "./typeDefs.generated";

const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective();
let schema = makeExecutableSchema({
  typeDefs: [authDirectiveTypeDefs, typeDefs],
  resolvers,
});
schema = authDirectiveTransformer(schema);

export default schema;
