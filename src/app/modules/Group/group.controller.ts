import { catchAsync } from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import { groupService } from "./group.service";

const getUserJoinedGroups = catchAsync(async (req, res) => {
  const result = await groupService.getUserJoinedGroups({ user: req.user });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User joined groups",
    data: result,
  });
});

const groupLogin = catchAsync(async (req, res) => {
  const result = await groupService.groupLogin({
    user: req.user,
    groupId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get group access",
    data: result,
  });
});

const createNewGroup = catchAsync(async (req, res) => {
  const result = await groupService.createNewGroup({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully create match group",
    data: result,
  });
});

const getGroupDetails = catchAsync(async (req, res) => {
  const result = await groupService.getGroupDetails({ group: req.group });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Retrieved Group Details",
    data: result,
  });
});

const updateGroup = catchAsync(async (req, res) => {
  const result = await groupService.updateGroup({
    group: req.group,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Update Group Information",
    data: result,
  });
});

const seeGroupMembers = catchAsync(async (req, res) => {
  const result = await groupService.seeGroupMembers({ group: req.group });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Retrieved Group members details",
    data: result,
  });
});

const updateGroupMemberRole = catchAsync(async (req, res) => {
  const result = await groupService.updateGroupMemberRole({
    group: req.group,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Update Role",
    data: result,
  });
});

const removeGroupMember = catchAsync(async (req, res) => {
  const result = await groupService.removeGroupMember({
    group: req.group,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Removed From The Group",
    data: result,
  });
});

export const groupController = {
  getUserJoinedGroups,
  groupLogin,
  createNewGroup,
  getGroupDetails,
  updateGroup,
  seeGroupMembers,
  updateGroupMemberRole,
  removeGroupMember,
};
