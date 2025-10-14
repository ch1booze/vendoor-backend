import { readFileSync } from "fs";
import { join } from "path";

const userSchema = readFileSync(join(__dirname, "user.graphql"), "utf-8");

export const typeDefs = [userSchema];
