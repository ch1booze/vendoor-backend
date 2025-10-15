/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { getBusiness as Query_getBusiness } from './business/resolvers/Query/getBusiness';
import    { createBusiness as Mutation_createBusiness } from './business/resolvers/Mutation/createBusiness';
import    { deleteBusiness as Mutation_deleteBusiness } from './business/resolvers/Mutation/deleteBusiness';
import    { updateBusiness as Mutation_updateBusiness } from './business/resolvers/Mutation/updateBusiness';
import    { Business } from './business/resolvers/Business';
    export const resolvers: Resolvers = {
      Query: { getBusiness: Query_getBusiness },
      Mutation: { createBusiness: Mutation_createBusiness,deleteBusiness: Mutation_deleteBusiness,updateBusiness: Mutation_updateBusiness },
      
      Business: Business
    }