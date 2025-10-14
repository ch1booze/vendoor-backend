import { readFileSync } from "fs";
import { join } from "path";
import { businessResolvers } from "./resolvers/business";

export const schema = readFileSync(
  join(process.cwd(), "src/graphql/schema.graphql"),
  "utf8"
);

export const resolvers = { ...businessResolvers };
