import { JwtPayload } from "jsonwebtoken";
import {
  IGroupMember,
  TCreateGroup,
  TUpdateGroup,
  TUpdateGroupMembers,
} from "./group.interface";
import { JwtGroupPayload } from "../../interface";
import mongoose, { startSession } from "mongoose";
import AppError from "../../errors/AppError";
import { Group, GroupMember } from "./group.model";
import { createGroupAccessToken } from "../../utils/jwtToken";

const getUserJoinedGroups = async (payload: { user: JwtPayload }) => {
  const result = await GroupMember.aggregate([
    { $match: { user_id: new mongoose.Types.ObjectId(payload.user.id) } },
    {
      $lookup: {
        from: "groups",
        localField: "group_id",
        foreignField: "_id",
        as: "groupDetails",
      },
    },
    {
      $unwind: "$groupDetails",
    },
    {
      $project: {
        _id: "$groupDetails._id",
        name: "$groupDetails.name",
        location: "$groupDetails.location",
      },
    },
  ]);

  return result;
};

const groupLogin = async (payload: { user: JwtPayload; groupId: string }) => {
  const user = await GroupMember.findOne({
    group_id: payload.groupId,
    user_id: payload.user.id,
  });

  if (!user) {
    throw new AppError(403, "Forbidden Access");
  }

  const accessPayload: JwtGroupPayload = {
    groupId: payload.groupId,
    userId: payload.user.id,
    isAdmin: user?.role === "admin" ? true : false,
  };

  const groupAccessToken = createGroupAccessToken(accessPayload);

  return {
    group_access: groupAccessToken,
  };
};

const createNewGroup = async (payload: {
  user: JwtPayload;
  data: TCreateGroup;
}) => {
  const session = await startSession();
  try {
    session.startTransaction();

    const newGroup = await Group.create([payload.data], { session });

    const groupMemberData: IGroupMember = {
      user_id: payload.user.id,
      role: "admin",
      join_at: new Date().toISOString(),
      group_id: newGroup[0].id,
    };

    await GroupMember.create([groupMemberData], { session });

    await session.commitTransaction();
    await session.endSession();

    const accessPayload: JwtGroupPayload = {
      groupId: newGroup[0].id,
      userId: payload.user.id,
      isAdmin: true,
    };

    const groupAccessToken = createGroupAccessToken(accessPayload);

    return {
      data: newGroup[0],
      group_access: groupAccessToken,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, "Failed to create new match group!", error);
  }
};

const getGroupDetails = async (payload: { group: JwtGroupPayload }) => {
  const groupId = payload.group.groupId;

  const result = await Group.findById(groupId);

  return result;
};

const updateGroup = async (payload: {
  group: JwtGroupPayload;
  data: TUpdateGroup;
}) => {
  return {
    message: "updateGroup",
    payload,
  };
};

const seeGroupMembers = async (payload: { group: JwtGroupPayload }) => {
  return {
    message: "seeGroupMembers",
    payload,
  };
};

const updateGroupMembers = async (payload: {
  group: JwtGroupPayload;
  data: TUpdateGroupMembers;
}) => {
  return {
    message: "updateGroupMembers",
    payload,
  };
};

export const groupService = {
  getUserJoinedGroups,
  groupLogin,
  createNewGroup,
  getGroupDetails,
  updateGroup,
  seeGroupMembers,
  updateGroupMembers,
};
