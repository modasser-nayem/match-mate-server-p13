import { catchAsync } from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const register = catchAsync(async (req, res) => {
  const result = await authService.register({ data: req.body });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Account successfully created",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await authService.login({ data: req.body });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Login",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await authService.changePassword({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Password Changed",
    data: result,
  });
});

export const authController = { register, login, changePassword };
