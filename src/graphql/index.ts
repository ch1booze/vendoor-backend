import { businessResolvers } from "./resolvers/business";
import typeDefs from "./schema";

export const schema = typeDefs;
export const resolvers = { ...businessResolvers };
