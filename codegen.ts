
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/schema.gql",
  generates: {
    "src/graphql/schema.ts": {
      plugins: ["typescript"]
    }
  }
};

export default config;
