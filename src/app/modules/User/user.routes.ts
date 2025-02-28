import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userController } from "./user.controller";
import requestValidate from "../../middlewares/requestValidation";
import { userSchemaValidation } from "./user.validation";

const route = Router();

// Get Profile
route.get("/profile", auth(), userController.getProfile);

// Update Profile
route.put(
  "/profile",
  auth(),
  requestValidate(userSchemaValidation.updateProfile),
  userController.updateProfile,
);

export const userRoutes = route;
