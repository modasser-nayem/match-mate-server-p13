import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TChangePassword, TLoginUser, TRegisterUser } from "./auth.interface";
import { createToken, makeHashPassword } from "./auth.utils";

const register = async (payload: { data: TRegisterUser }) => {
  const isEmailExist = await User.findOne({ email: payload.data.email });

  if (isEmailExist) {
    throw new AppError(400, "This email already exist!");
  }

  const user = new User({
    name: payload.data.name,
    email: payload.data.email,
    password: payload.data.password,
  });

  await user.save();

  return user;
};

const login = async (payload: { data: TLoginUser }) => {
  const user = await User.findOne({ email: payload.data.email }).select(
    "+password",
  );

  if (!user) {
    throw new AppError(404, "User not exist!");
  }

  if (!(await User.isPasswordIsMatched(payload.data.password, user.password))) {
    throw new AppError(400, "incorrect password");
  }

  const access_token = createToken(
    { id: user.id },
    config.JWT_ACCESS_SECRET,
    config.JWT_ACCESS_EXPIRES_IN as "5d",
  );

  return { access_token };
};

const changePassword = async (payload: {
  user: JwtPayload;
  data: TChangePassword;
}) => {
  const user = await User.findById(payload.user.id).select("+password");

  if (!user) {
    throw new AppError(404, "User not exist!");
  }

  if (
    !(await User.isPasswordIsMatched(
      payload.data.currentPassword,
      user.password,
    ))
  ) {
    throw new AppError(400, "current password incorrect!");
  }

  payload.data.newPassword = await makeHashPassword(payload.data.newPassword);

  await User.findByIdAndUpdate(user.id, {
    password: payload.data.newPassword,
  });

  return null;
};

export const authService = { register, login, changePassword };
