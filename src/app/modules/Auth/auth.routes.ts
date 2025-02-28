import { Router } from "express";
import { authController } from "./auth.controller";
import requestValidate from "../../middlewares/requestValidation";
import { authSchemaValidation } from "./auth.validation";
import { auth } from "../../middlewares/auth";

const route = Router();

// register user
route.post(
  "/register",
  requestValidate(authSchemaValidation.register),
  authController.register,
);

// login user
route.post(
  "/login",
  requestValidate(authSchemaValidation.login),
  authController.login,
);

// change password
route.post(
  "/change-password",
  auth(),
  requestValidate(authSchemaValidation.changePassword),
  authController.changePassword,
);

export const authRoutes = route;
