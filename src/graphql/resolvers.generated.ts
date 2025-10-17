/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { business as Query_business } from './business/resolvers/Query/business';
import    { businessById as Query_businessById } from './business/resolvers/Query/businessById';
import    { businessChats as Query_businessChats } from './business/resolvers/Query/businessChats';
import    { businessCustomerById as Query_businessCustomerById } from './business/resolvers/Query/businessCustomerById';
import    { businessCustomers as Query_businessCustomers } from './business/resolvers/Query/businessCustomers';
import    { businessOrderById as Query_businessOrderById } from './order/resolvers/Query/businessOrderById';
import    { businessOrders as Query_businessOrders } from './order/resolvers/Query/businessOrders';
import    { businessProductById as Query_businessProductById } from './product/resolvers/Query/businessProductById';
import    { businessProducts as Query_businessProducts } from './product/resolvers/Query/businessProducts';
import    { businessesForCustomer as Query_businessesForCustomer } from './business/resolvers/Query/businessesForCustomer';
import    { customer as Query_customer } from './customer/resolvers/Query/customer';
import    { customerChatsForBusiness as Query_customerChatsForBusiness } from './customer/resolvers/Query/customerChatsForBusiness';
import    { customerOrderById as Query_customerOrderById } from './order/resolvers/Query/customerOrderById';
import    { customerOrders as Query_customerOrders } from './order/resolvers/Query/customerOrders';
import    { customerProductById as Query_customerProductById } from './product/resolvers/Query/customerProductById';
import    { customerProducts as Query_customerProducts } from './product/resolvers/Query/customerProducts';
import    { inventories as Query_inventories } from './inventory/resolvers/Query/inventories';
import    { cancelCustomerOrder as Mutation_cancelCustomerOrder } from './order/resolvers/Mutation/cancelCustomerOrder';
import    { createBusiness as Mutation_createBusiness } from './business/resolvers/Mutation/createBusiness';
import    { createBusinessChat as Mutation_createBusinessChat } from './business/resolvers/Mutation/createBusinessChat';
import    { createCustomerChat as Mutation_createCustomerChat } from './customer/resolvers/Mutation/createCustomerChat';
import    { createCustomerOrder as Mutation_createCustomerOrder } from './order/resolvers/Mutation/createCustomerOrder';
import    { createInventory as Mutation_createInventory } from './inventory/resolvers/Mutation/createInventory';
import    { createProduct as Mutation_createProduct } from './product/resolvers/Mutation/createProduct';
import    { deleteProduct as Mutation_deleteProduct } from './product/resolvers/Mutation/deleteProduct';
import    { registerCustomer as Mutation_registerCustomer } from './customer/resolvers/Mutation/registerCustomer';
import    { updateBusiness as Mutation_updateBusiness } from './business/resolvers/Mutation/updateBusiness';
import    { updateCustomerOrder as Mutation_updateCustomerOrder } from './order/resolvers/Mutation/updateCustomerOrder';
import    { updateProduct as Mutation_updateProduct } from './product/resolvers/Mutation/updateProduct';
import    { Business } from './business/resolvers/Business';
import    { BusinessChat } from './business/resolvers/BusinessChat';
import    { Customer } from './customer/resolvers/Customer';
import    { CustomerChat } from './customer/resolvers/CustomerChat';
import    { Inventory } from './inventory/resolvers/Inventory';
import    { Order } from './order/resolvers/Order';
import    { OrderItem } from './order/resolvers/OrderItem';
import    { Product } from './product/resolvers/Product';
import    { BigIntResolver,DateTimeResolver,JSONResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { business: Query_business,businessById: Query_businessById,businessChats: Query_businessChats,businessCustomerById: Query_businessCustomerById,businessCustomers: Query_businessCustomers,businessOrderById: Query_businessOrderById,businessOrders: Query_businessOrders,businessProductById: Query_businessProductById,businessProducts: Query_businessProducts,businessesForCustomer: Query_businessesForCustomer,customer: Query_customer,customerChatsForBusiness: Query_customerChatsForBusiness,customerOrderById: Query_customerOrderById,customerOrders: Query_customerOrders,customerProductById: Query_customerProductById,customerProducts: Query_customerProducts,inventories: Query_inventories },
      Mutation: { cancelCustomerOrder: Mutation_cancelCustomerOrder,createBusiness: Mutation_createBusiness,createBusinessChat: Mutation_createBusinessChat,createCustomerChat: Mutation_createCustomerChat,createCustomerOrder: Mutation_createCustomerOrder,createInventory: Mutation_createInventory,createProduct: Mutation_createProduct,deleteProduct: Mutation_deleteProduct,registerCustomer: Mutation_registerCustomer,updateBusiness: Mutation_updateBusiness,updateCustomerOrder: Mutation_updateCustomerOrder,updateProduct: Mutation_updateProduct },
      
      Business: Business,
BusinessChat: BusinessChat,
Customer: Customer,
CustomerChat: CustomerChat,
Inventory: Inventory,
Order: Order,
OrderItem: OrderItem,
Product: Product,
BigInt: BigIntResolver,
DateTime: DateTimeResolver,
JSON: JSONResolver
    }