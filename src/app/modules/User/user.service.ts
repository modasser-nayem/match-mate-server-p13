import { JwtPayload } from "jsonwebtoken";
import { User } from "./user.model";

const getProfile = async (payload: { user: JwtPayload }) => {
  const user = await User.findById(payload.user.id, { __v: 0 });

  return user;
};

export const userService = { getProfile };
