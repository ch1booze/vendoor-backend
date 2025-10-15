import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: bigint; output: bigint; }
  DateTime: { input: Date | string; output: Date | string; }
  JSON: { input: any; output: any; }
};

export type Business = {
  __typename?: 'Business';
  businessChats: Array<BusinessChat>;
  createdAt: Scalars['DateTime']['output'];
  customerChats: Array<CustomerChat>;
  customers: Array<Customer>;
  data?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  orders: Array<Order>;
  products: Array<Product>;
  tags: Array<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type BusinessChat = {
  __typename?: 'BusinessChat';
  business: Business;
  businessId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  query: Scalars['String']['output'];
  reply: Scalars['String']['output'];
};

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  unit: Scalars['String']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  businesses: Array<Business>;
  createdAt: Scalars['DateTime']['output'];
  customerChats: Array<CustomerChat>;
  orders: Array<Order>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type CustomerChat = {
  __typename?: 'CustomerChat';
  business: Business;
  businessId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  customer: Customer;
  customerId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  query: Scalars['String']['output'];
  reply: Scalars['String']['output'];
};

export type Inventory = {
  __typename?: 'Inventory';
  createdAt: Scalars['DateTime']['output'];
  delta: Scalars['Int']['output'];
  event: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  product: Product;
  productId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBusiness: Business;
  createBusinessChat: BusinessChat;
  createCustomer: Customer;
  createCustomerChat: CustomerChat;
  createInventory: Inventory;
  createOrder: Order;
  createProduct?: Maybe<Product>;
  deleteBusiness: Scalars['Boolean']['output'];
  deleteCustomer: Scalars['Boolean']['output'];
  deleteOrder: Scalars['Boolean']['output'];
  deleteProduct?: Maybe<Scalars['Boolean']['output']>;
  updateBusiness: Business;
  updateOrderStatus: Order;
  updateProduct?: Maybe<Product>;
};


export type MutationcreateBusinessArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
};


export type MutationcreateBusinessChatArgs = {
  businessId: Scalars['ID']['input'];
  query: Scalars['String']['input'];
  reply: Scalars['String']['input'];
};


export type MutationcreateCustomerArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationcreateCustomerChatArgs = {
  businessId: Scalars['ID']['input'];
  customerId: Scalars['ID']['input'];
  query: Scalars['String']['input'];
  reply: Scalars['String']['input'];
};


export type MutationcreateInventoryArgs = {
  delta: Scalars['Int']['input'];
  event: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
};


export type MutationcreateOrderArgs = {
  businessId: Scalars['ID']['input'];
  customerId: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};


export type MutationcreateProductArgs = {
  input: CreateProductInput;
};


export type MutationdeleteBusinessArgs = {
  id: Scalars['ID']['input'];
};


export type MutationdeleteCustomerArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationdeleteOrderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationdeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationupdateBusinessArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationupdateOrderStatusArgs = {
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};


export type MutationupdateProductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
};

export type Order = {
  __typename?: 'Order';
  business: Business;
  businessId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  customer: Customer;
  customerId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  items: Array<OrderItem>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Order;
  price: Scalars['BigInt']['output'];
  product?: Maybe<Product>;
  quantity: Scalars['Int']['output'];
  tags: Array<Scalars['String']['output']>;
  unit: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Product = {
  __typename?: 'Product';
  business: Business;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  stock: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  business?: Maybe<Business>;
  businessChat?: Maybe<BusinessChat>;
  businessChats: Array<BusinessChat>;
  businesses: Array<Business>;
  customer?: Maybe<Customer>;
  customerChat?: Maybe<CustomerChat>;
  customerChats: Array<CustomerChat>;
  customers: Array<Customer>;
  inventories: Array<Inventory>;
  inventory?: Maybe<Inventory>;
  order?: Maybe<Order>;
  orders: Array<Order>;
};


export type QuerybusinessArgs = {
  id: Scalars['ID']['input'];
};


export type QuerybusinessChatArgs = {
  id: Scalars['ID']['input'];
};


export type QuerybusinessChatsArgs = {
  businessId: Scalars['ID']['input'];
};


export type QuerycustomerArgs = {
  userId: Scalars['ID']['input'];
};


export type QuerycustomerChatArgs = {
  id: Scalars['ID']['input'];
};


export type QuerycustomerChatsArgs = {
  customerId: Scalars['ID']['input'];
};


export type QueryinventoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryorderArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Business: ResolverTypeWrapper<Business>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  BusinessChat: ResolverTypeWrapper<BusinessChat>;
  CreateProductInput: CreateProductInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Customer: ResolverTypeWrapper<Customer>;
  CustomerChat: ResolverTypeWrapper<CustomerChat>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Inventory: ResolverTypeWrapper<Inventory>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Order: ResolverTypeWrapper<Order>;
  OrderItem: ResolverTypeWrapper<OrderItem>;
  Product: ResolverTypeWrapper<Product>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  UpdateProductInput: UpdateProductInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BigInt: Scalars['BigInt']['output'];
  Business: Business;
  String: Scalars['String']['output'];
  ID: Scalars['ID']['output'];
  BusinessChat: BusinessChat;
  CreateProductInput: CreateProductInput;
  Int: Scalars['Int']['output'];
  Customer: Customer;
  CustomerChat: CustomerChat;
  DateTime: Scalars['DateTime']['output'];
  Inventory: Inventory;
  JSON: Scalars['JSON']['output'];
  Mutation: Record<PropertyKey, never>;
  Boolean: Scalars['Boolean']['output'];
  Order: Order;
  OrderItem: OrderItem;
  Product: Product;
  Query: Record<PropertyKey, never>;
  UpdateProductInput: UpdateProductInput;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BusinessResolvers<ContextType = any, ParentType extends ResolversParentTypes['Business'] = ResolversParentTypes['Business']> = {
  businessChats?: Resolver<Array<ResolversTypes['BusinessChat']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  customerChats?: Resolver<Array<ResolversTypes['CustomerChat']>, ParentType, ContextType>;
  customers?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type BusinessChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['BusinessChat'] = ResolversParentTypes['BusinessChat']> = {
  business?: Resolver<ResolversTypes['Business'], ParentType, ContextType>;
  businessId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  query?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reply?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  businesses?: Resolver<Array<ResolversTypes['Business']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  customerChats?: Resolver<Array<ResolversTypes['CustomerChat']>, ParentType, ContextType>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type CustomerChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerChat'] = ResolversParentTypes['CustomerChat']> = {
  business?: Resolver<ResolversTypes['Business'], ParentType, ContextType>;
  businessId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  query?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reply?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type InventoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Inventory'] = ResolversParentTypes['Inventory']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  delta?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  event?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBusiness?: Resolver<ResolversTypes['Business'], ParentType, ContextType, RequireFields<MutationcreateBusinessArgs, 'name' | 'tags'>>;
  createBusinessChat?: Resolver<ResolversTypes['BusinessChat'], ParentType, ContextType, RequireFields<MutationcreateBusinessChatArgs, 'businessId' | 'query' | 'reply'>>;
  createCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationcreateCustomerArgs, 'userId'>>;
  createCustomerChat?: Resolver<ResolversTypes['CustomerChat'], ParentType, ContextType, RequireFields<MutationcreateCustomerChatArgs, 'businessId' | 'customerId' | 'query' | 'reply'>>;
  createInventory?: Resolver<ResolversTypes['Inventory'], ParentType, ContextType, RequireFields<MutationcreateInventoryArgs, 'delta' | 'event' | 'productId'>>;
  createOrder?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationcreateOrderArgs, 'businessId' | 'customerId' | 'status'>>;
  createProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationcreateProductArgs, 'input'>>;
  deleteBusiness?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeleteBusinessArgs, 'id'>>;
  deleteCustomer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeleteCustomerArgs, 'userId'>>;
  deleteOrder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeleteOrderArgs, 'id'>>;
  deleteProduct?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationdeleteProductArgs, 'id'>>;
  updateBusiness?: Resolver<ResolversTypes['Business'], ParentType, ContextType, RequireFields<MutationupdateBusinessArgs, 'id'>>;
  updateOrderStatus?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationupdateOrderStatusArgs, 'id' | 'status'>>;
  updateProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationupdateProductArgs, 'id' | 'input'>>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  business?: Resolver<ResolversTypes['Business'], ParentType, ContextType>;
  businessId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['OrderItem']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type OrderItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  business?: Resolver<ResolversTypes['Business'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  business?: Resolver<Maybe<ResolversTypes['Business']>, ParentType, ContextType, RequireFields<QuerybusinessArgs, 'id'>>;
  businessChat?: Resolver<Maybe<ResolversTypes['BusinessChat']>, ParentType, ContextType, RequireFields<QuerybusinessChatArgs, 'id'>>;
  businessChats?: Resolver<Array<ResolversTypes['BusinessChat']>, ParentType, ContextType, RequireFields<QuerybusinessChatsArgs, 'businessId'>>;
  businesses?: Resolver<Array<ResolversTypes['Business']>, ParentType, ContextType>;
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<QuerycustomerArgs, 'userId'>>;
  customerChat?: Resolver<Maybe<ResolversTypes['CustomerChat']>, ParentType, ContextType, RequireFields<QuerycustomerChatArgs, 'id'>>;
  customerChats?: Resolver<Array<ResolversTypes['CustomerChat']>, ParentType, ContextType, RequireFields<QuerycustomerChatsArgs, 'customerId'>>;
  customers?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType>;
  inventories?: Resolver<Array<ResolversTypes['Inventory']>, ParentType, ContextType>;
  inventory?: Resolver<Maybe<ResolversTypes['Inventory']>, ParentType, ContextType, RequireFields<QueryinventoryArgs, 'id'>>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryorderArgs, 'id'>>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BigInt?: GraphQLScalarType;
  Business?: BusinessResolvers<ContextType>;
  BusinessChat?: BusinessChatResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomerChat?: CustomerChatResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Inventory?: InventoryResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderItem?: OrderItemResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

