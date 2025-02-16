import { Router } from "express";

const route = Router();

// test route
route.get("/", (req, res) => {
   res.status(200).json({ success: true, message: "Routes Perfectly Working" });
});

export const authRoutes = route;
