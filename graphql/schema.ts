
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Business {
    id: string;
    name: string;
    type: string;
    description?: Nullable<string>;
    workingHours?: Nullable<JSON>;
    owner: User;
}

export abstract class IQuery {
    abstract business(id: string): Nullable<Business> | Promise<Nullable<Business>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract registerBusiness(userID: string, name: string, type: string, description?: Nullable<string>, workingHours?: Nullable<JSON>): Business | Promise<Business>;

    abstract updateBusiness(userID: string, name?: Nullable<string>, type?: Nullable<string>, description?: Nullable<string>, workingHours?: Nullable<JSON>): Business | Promise<Business>;

    abstract getBusiness(id: string): Business | Promise<Business>;

    abstract authenticateUser(email?: Nullable<string>, phoneNumber?: Nullable<string>): boolean | Promise<boolean>;

    abstract verifyUser(preAuthSessionId: string, deviceId: string, userInputCode: string): User | Promise<User>;

    abstract upsertUserProfile(id: string, firstName?: Nullable<string>, lastName?: Nullable<string>): User | Promise<User>;
}

export class User {
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    business?: Nullable<Business>;
}

export type JSON = any;
type Nullable<T> = T | null;
