import { createServer, Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

let server: Server = createServer(app);

const main = async () => {
   try {
      await mongoose.connect(config.DB_URL as string);
      server = app.listen(config.PORT, () => {
         console.log(`SERVER IS RUNNING ON ${config.PORT}`);
      });
   } catch (error) {
      console.log(error);
   }
};

main();

process.on("unhandledRejection", (err) => {
   console.log(`Unhandled Rejection is detected. Shutting down server...`, err);
   if (server) {
      server.close(() => {
         process.exit(1);
      });
   }
   process.exit(1);
});

process.on("uncaughtException", (err) => {
   console.log(`Uncaught Exception is detected. Shutting down server...`, err);

   process.exit(1);
});
