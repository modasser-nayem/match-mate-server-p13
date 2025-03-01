import jwt from "jsonwebtoken";
import { JwtGroupPayload } from "../interface";
import config from "../config";

export const createGroupAccessToken = (jwtPayload: {
  userId: string;
  groupId: string;
  isAdmin: boolean;
}) => {
  return jwt.sign(jwtPayload, config.JWT_GROUP_ACCESS_SECRET, {
    expiresIn: config.JWT_GROUP_ACCESS_EXPIRES_IN as "5d",
  });
};

export const verifyGroupAccessToken = (token: string) => {
  return jwt.verify(token, config.JWT_GROUP_ACCESS_SECRET) as JwtGroupPayload;
};
