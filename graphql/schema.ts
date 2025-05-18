/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class User {
  id: string;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
}

export abstract class IQuery {
  abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
  abstract authenticateUser(
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

type Nullable<T> = T | null;
