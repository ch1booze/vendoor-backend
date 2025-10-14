import { GraphQLError } from "graphql";

export enum Role {
  BUSINESS = "business",
  CUSTOMER = "customer",
}

export const roleGuard = (userRole: string, permittedRole: Role) => {
  if (userRole !== permittedRole)
    throw new GraphQLError("Forbidden", {
      extensions: { code: "FORBIDDEN" },
    });
};
