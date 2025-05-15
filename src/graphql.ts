
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class User {
    id: string;
    email?: Nullable<string>;
    phoneNumber?: Nullable<string>;
}

export abstract class IQuery {
    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(email?: Nullable<string>, phoneNumber?: Nullable<string>): User | Promise<User>;

    abstract updateUser(id: string, email?: Nullable<string>, phoneNumber?: Nullable<string>): User | Promise<User>;

    abstract deleteUser(id: string): boolean | Promise<boolean>;
}

type Nullable<T> = T | null;
