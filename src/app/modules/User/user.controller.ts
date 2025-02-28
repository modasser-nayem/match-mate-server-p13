import { catchAsync } from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const getProfile = catchAsync(async (req, res) => {
  const result = await userService.getProfile({ user: req.user });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile Successfully Retrieved",
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const result = await userService.updateProfile({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile Successfully Updated",
    data: result,
  });
});

export const userController = { getProfile, updateProfile };
