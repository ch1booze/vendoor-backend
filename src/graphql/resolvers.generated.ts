/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { business as Query_business } from './business/resolvers/Query/business';
import    { businessChat as Query_businessChat } from './business-chat/resolvers/Query/businessChat';
import    { businessChats as Query_businessChats } from './business-chat/resolvers/Query/businessChats';
import    { businesses as Query_businesses } from './business/resolvers/Query/businesses';
import    { customer as Query_customer } from './customer/resolvers/Query/customer';
import    { customerChat as Query_customerChat } from './customer-chat/resolvers/Query/customerChat';
import    { customerChats as Query_customerChats } from './customer-chat/resolvers/Query/customerChats';
import    { customers as Query_customers } from './customer/resolvers/Query/customers';
import    { inventories as Query_inventories } from './inventory/resolvers/Query/inventories';
import    { inventory as Query_inventory } from './inventory/resolvers/Query/inventory';
import    { order as Query_order } from './order/resolvers/Query/order';
import    { orders as Query_orders } from './order/resolvers/Query/orders';
import    { createBusiness as Mutation_createBusiness } from './business/resolvers/Mutation/createBusiness';
import    { createBusinessChat as Mutation_createBusinessChat } from './business-chat/resolvers/Mutation/createBusinessChat';
import    { createCustomer as Mutation_createCustomer } from './customer/resolvers/Mutation/createCustomer';
import    { createCustomerChat as Mutation_createCustomerChat } from './customer-chat/resolvers/Mutation/createCustomerChat';
import    { createInventory as Mutation_createInventory } from './inventory/resolvers/Mutation/createInventory';
import    { createOrder as Mutation_createOrder } from './order/resolvers/Mutation/createOrder';
import    { createProduct as Mutation_createProduct } from './product/resolvers/Mutation/createProduct';
import    { deleteBusiness as Mutation_deleteBusiness } from './business/resolvers/Mutation/deleteBusiness';
import    { deleteCustomer as Mutation_deleteCustomer } from './customer/resolvers/Mutation/deleteCustomer';
import    { deleteOrder as Mutation_deleteOrder } from './order/resolvers/Mutation/deleteOrder';
import    { deleteProduct as Mutation_deleteProduct } from './product/resolvers/Mutation/deleteProduct';
import    { updateBusiness as Mutation_updateBusiness } from './business/resolvers/Mutation/updateBusiness';
import    { updateOrderStatus as Mutation_updateOrderStatus } from './order/resolvers/Mutation/updateOrderStatus';
import    { updateProduct as Mutation_updateProduct } from './product/resolvers/Mutation/updateProduct';
import    { Business } from './business/resolvers/Business';
import    { BusinessChat } from './business-chat/resolvers/BusinessChat';
import    { Customer } from './customer/resolvers/Customer';
import    { CustomerChat } from './customer-chat/resolvers/CustomerChat';
import    { Inventory } from './inventory/resolvers/Inventory';
import    { Order } from './order/resolvers/Order';
import    { OrderItem } from './order/resolvers/OrderItem';
import    { Product } from './product/resolvers/Product';
import    { BigIntResolver,DateTimeResolver,JSONResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { business: Query_business,businessChat: Query_businessChat,businessChats: Query_businessChats,businesses: Query_businesses,customer: Query_customer,customerChat: Query_customerChat,customerChats: Query_customerChats,customers: Query_customers,inventories: Query_inventories,inventory: Query_inventory,order: Query_order,orders: Query_orders },
      Mutation: { createBusiness: Mutation_createBusiness,createBusinessChat: Mutation_createBusinessChat,createCustomer: Mutation_createCustomer,createCustomerChat: Mutation_createCustomerChat,createInventory: Mutation_createInventory,createOrder: Mutation_createOrder,createProduct: Mutation_createProduct,deleteBusiness: Mutation_deleteBusiness,deleteCustomer: Mutation_deleteCustomer,deleteOrder: Mutation_deleteOrder,deleteProduct: Mutation_deleteProduct,updateBusiness: Mutation_updateBusiness,updateOrderStatus: Mutation_updateOrderStatus,updateProduct: Mutation_updateProduct },
      
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