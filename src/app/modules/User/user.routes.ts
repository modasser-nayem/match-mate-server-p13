import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userController } from "./user.controller";

const route = Router();

// Get Profile
route.get("/profile", auth(), userController.getProfile);

// Update Profile
route.put("/profile");

export const userRoutes = route;
