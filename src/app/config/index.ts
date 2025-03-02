import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV as string,
  PORT: process.env.PORT,
  DB_URL: process.env.DATABASE_URL,
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS),
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN as string,
  JWT_GROUP_ACCESS_SECRET: process.env.JWT_GROUP_ACCESS_SECRET as string,
  JWT_GROUP_ACCESS_EXPIRES_IN: process.env
    .JWT_GROUP_ACCESS_EXPIRES_IN as string,
  GROUP_INVITE_SECRET: process.env.GROUP_INVITE_SECRET as string,
  GROUP_INVITE_EXPIRES_IN: process.env.GROUP_INVITE_EXPIRES_IN as string,
};
