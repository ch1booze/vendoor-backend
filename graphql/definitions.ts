/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class AddProductInput {
  name: string;
  description?: Nullable<string>;
  price: string;
  unit: string;
  category: string;
  businessId: string;
}

export class Business {
  id: string;
  name: string;
  type: string;
  description?: Nullable<string>;
  workingHours?: Nullable<JSON>;
  user: User;
}

export abstract class IQuery {
  abstract getBusiness(id: string): Business | Promise<Business>;

  abstract product(id: string): Nullable<Product> | Promise<Nullable<Product>>;

  abstract getProduct(id: string): Product | Promise<Product>;

  abstract getProducts(businessId: string): Product[] | Promise<Product[]>;

  abstract getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
  abstract registerBusiness(
    userID: string,
    name: string,
    type: string,
    description?: Nullable<string>,
    workingHours?: Nullable<JSON>,
  ): Business | Promise<Business>;

  abstract updateBusiness(
    userID: string,
    name?: Nullable<string>,
    type?: Nullable<string>,
    description?: Nullable<string>,
    workingHours?: Nullable<JSON>,
  ): Business | Promise<Business>;

  abstract addProducts(
    products: AddProductInput[],
  ): Product[] | Promise<Product[]>;

  abstract signinupUser(
    email?: Nullable<string>,
    phoneNumber?: Nullable<string>,
  ): boolean | Promise<boolean>;

  abstract verifyUser(
    preAuthSessionId: string,
    deviceId: string,
    userInputCode: string,
  ): User | Promise<User>;

  abstract upsertUserProfile(
    id: string,
    firstName?: Nullable<string>,
    lastName?: Nullable<string>,
  ): User | Promise<User>;
}

export class Product {
  id: string;
  name: string;
  description?: Nullable<string>;
  price: string;
  unit: string;
  category: string;
  business: Business;
}

export class User {
  id: string;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  business?: Nullable<Business>;
}

export type JSON = any;
type Nullable<T> = T | null;
