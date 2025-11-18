import { GraphQLError } from "graphql";
import { Prisma } from "@prisma/client";

export function errorHandler(error: unknown): GraphQLError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return new GraphQLError("Unique constraint violation", {
          extensions: { code: "BAD_USER_INPUT", field: error.meta?.target },
        });

      case "P2003":
        return new GraphQLError("Invalid reference (foreign key failed)", {
          extensions: { code: "BAD_USER_INPUT" },
        });

      case "P2025":
        return new GraphQLError("Record not found", {
          extensions: { code: "NOT_FOUND" },
        });

      default:
        return new GraphQLError("Database error", {
          extensions: { code: error.code },
        });
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new GraphQLError("Invalid data sent to database", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  return new GraphQLError("Internal server error", {
    extensions: { code: "INTERNAL_SERVER_ERROR" },
  });
}
