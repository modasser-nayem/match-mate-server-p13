import { JwtPayload } from "jsonwebtoken";
import { User } from "./user.model";
import { TUpdateProfile } from "./user.interface";
import AppError from "../../errors/AppError";

const getProfile = async (payload: { user: JwtPayload }) => {
  const user = await User.findById(payload.user.id, { __v: 0 });

  return user;
};

const updateProfile = async (payload: {
  user: JwtPayload;
  data: TUpdateProfile;
}) => {
  if (
    payload.data?.email &&
    (await User.findOne({
      _id: { $ne: payload.user.id },
      email: payload.data.email,
    }))
  ) {
    throw new AppError(400, "Email already exist, please use another email");
  }

  const user = User.findByIdAndUpdate(payload.user.id, payload.data, {
    new: true,
    projection: { __v: 0 },
  });

  return user;
};

export const userService = { getProfile, updateProfile };
