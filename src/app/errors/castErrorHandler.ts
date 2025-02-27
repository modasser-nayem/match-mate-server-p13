import mongoose from "mongoose";
import { TErrorHandlerResponse } from "../interface/error";

const castErrorHandler = (
  err: mongoose.Error.CastError,
): TErrorHandlerResponse => {
  const error = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid _Id",
    error: error,
  };
};

export default castErrorHandler;
