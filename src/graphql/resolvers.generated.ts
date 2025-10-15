/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { getBusiness as Query_getBusiness } from './business/resolvers/Query/getBusiness';
import    { createBusiness as Mutation_createBusiness } from './business/resolvers/Mutation/createBusiness';
import    { createProduct as Mutation_createProduct } from './product/resolvers/Mutation/createProduct';
import    { deleteBusiness as Mutation_deleteBusiness } from './business/resolvers/Mutation/deleteBusiness';
import    { deleteProduct as Mutation_deleteProduct } from './product/resolvers/Mutation/deleteProduct';
import    { updateBusiness as Mutation_updateBusiness } from './business/resolvers/Mutation/updateBusiness';
import    { updateProduct as Mutation_updateProduct } from './product/resolvers/Mutation/updateProduct';
import    { Business } from './business/resolvers/Business';
import    { Product } from './product/resolvers/Product';
    export const resolvers: Resolvers = {
      Query: { getBusiness: Query_getBusiness },
      Mutation: { createBusiness: Mutation_createBusiness,createProduct: Mutation_createProduct,deleteBusiness: Mutation_deleteBusiness,deleteProduct: Mutation_deleteProduct,updateBusiness: Mutation_updateBusiness,updateProduct: Mutation_updateProduct },
      
      Business: Business,
Product: Product
    }