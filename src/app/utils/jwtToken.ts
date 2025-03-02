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

// ============ Group Invitation ===============
type TInviteTokenPayload = {
  group_id: string;
  invite_by: string;
  invite_to: string;
  invite_at: string;
};
export const createGroupInviteToken = (payload: TInviteTokenPayload) => {
  return jwt.sign(payload, config.GROUP_INVITE_SECRET, {
    expiresIn: config.GROUP_INVITE_EXPIRES_IN as "5d",
  });
};

export const verifyGroupInviteToken = (token: string) => {
  return jwt.verify(token, config.GROUP_INVITE_SECRET) as TInviteTokenPayload;
};
