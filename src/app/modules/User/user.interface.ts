import { Model } from "mongoose";
import { z } from "zod";
import { userSchemaValidation } from "./user.validation";

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

export type TUpdateProfile = z.infer<typeof userSchemaValidation.updateProfile>;
