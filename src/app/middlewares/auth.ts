import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import { catchAsync } from "../utils/catchAsyncHandler";
import config from "../config";
import { ExtendedJwtPayload } from "../interface";
import { User } from "../modules/User/user.model";

export const auth = () =>
  catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(401, "You are not authorized!");
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_SECRET as string,
    ) as ExtendedJwtPayload;

    const { id } = decoded;

    // checking if the user is exist
    const user = await User.findById(id);

    if (!user) {
      throw new AppError(404, "This account is not found!");
    }

    req.user = decoded as ExtendedJwtPayload;
    next();
  });
