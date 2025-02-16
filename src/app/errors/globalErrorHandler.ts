import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
   err: Error,
   req: Request,
   res: Response,
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   next: NextFunction
) => {
   const statusCode = 500;
   const message = "Internal server error";

   res.status(statusCode).json({
      success: false,
      message,
      errors: null,
      stack: null,
   });
};
