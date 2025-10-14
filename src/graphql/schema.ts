import { gql } from "@elysiajs/apollo";

const typeDefs = gql`
  type Query {
    getBusiness: Business
  }

  type Mutation {
    createBusiness(input: CreateBusinessInput!): Business
    updateBusiness(input: UpdateBusinessInput!): Business
    deleteBusiness: Boolean
  }

  type Business {
    id: ID!
    name: String
    description: String
  }

  input CreateBusinessInput {
    name: String!
    description: String
  }

  input UpdateBusinessInput {
    name: String
    description: String
  }
`;

export default typeDefs;
