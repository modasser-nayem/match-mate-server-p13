import { Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  profile_picture?: string;
  contact?: string;
}

export interface IUserModel extends Model<IUser> {
  isPasswordIsMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
