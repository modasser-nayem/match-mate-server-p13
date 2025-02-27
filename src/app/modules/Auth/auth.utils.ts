import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { ExtendedJwtPayload } from "../../interface";

export const makeHashPassword = async (plainTextPassword: string) => {
  return await bcrypt.hash(
    plainTextPassword,
    Number(config.BCRYPT_SALT_ROUNDS),
  );
};

export const checkPasswordIsCorrect = async (
  plainTextPassword: string,
  hashPassword: string,
) => {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const createToken = (
  jwtPayload: { id: string },
  secret: string,
  expiresIn: "10s" | "1h" | "2h" | "5h" | "1d" | "2d" | "5d" | "30d" | number,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as ExtendedJwtPayload;
};
