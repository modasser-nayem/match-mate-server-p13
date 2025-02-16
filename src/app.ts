import express from "express";
import cors from "cors";
import { notfound } from "./app/errors/notFound";
import { globalErrorHandler } from "./app/errors/globalErrorHandler";
import routers from "./app/routes";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use("/api/v1", routers);

// root route
app.get("/", (req, res) => {
   res.status(200).send(
      '<div style="height:80vh; width:100vw; display:flex; justify-content:center;align-items:center;font-size:4rem;font-style: oblique;font-weight: bold;font-family:system-ui;color:purple;">Match Mate Server is Running...</div>'
   );
});

// Error Handling
app.use(notfound);
app.use(globalErrorHandler);

export default app;
