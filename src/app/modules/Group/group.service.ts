import { JwtPayload } from "jsonwebtoken";
import {
  IGroupMember,
  TAcceptGroupInvite,
  TCreateGroup,
  TRemoveGroupMember,
  TSendGroupInvite,
  TUpdateGroup,
  TUpdateGroupMemberRole,
} from "./group.interface";
import { JwtGroupPayload } from "../../interface";
import mongoose, { startSession } from "mongoose";
import AppError from "../../errors/AppError";
import { Group, GroupInvite, GroupMember } from "./group.model";
import {
  createGroupAccessToken,
  createGroupInviteToken,
  verifyGroupInviteToken,
} from "../../utils/jwtToken";
import { User } from "../User/user.model";

// ============ Group ===============
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
  const result = await Group.findByIdAndUpdate(
    payload.group.groupId,
    payload.data,
    { new: true },
  );

  return result;
};

// ============ Group Member ===============
const seeGroupMembers = async (payload: { group: JwtGroupPayload }) => {
  const result = await GroupMember.find(
    { group_id: payload.group.groupId },
    { user_id: 1, role: 1, join_at: 1, _id: 0 },
  )
    .populate("user_id", "name")
    .lean();

  const formattedResult = result.map((member) => {
    const user = member.user_id as unknown as { _id: string; name: string };

    return {
      user_id: user?._id.toString(),
      name: user?.name,
      role: member.role,
      join_at: member.join_at,
    };
  });

  return formattedResult;
};

const updateGroupMemberRole = async (payload: {
  group: JwtGroupPayload;
  data: TUpdateGroupMemberRole;
}) => {
  if (payload.group.userId === payload.data.user_id) {
    throw new AppError(400, "You can't update yourself");
  }

  const result = await GroupMember.findOneAndUpdate(
    { user_id: payload.data.user_id, group_id: payload.group.groupId },
    { role: payload.data.role },
    { new: true },
  );

  if (!result) {
    throw new AppError(404, "Member not found!");
  }

  return result;
};

const removeGroupMember = async (payload: {
  group: JwtGroupPayload;
  data: TRemoveGroupMember;
}) => {
  const result = await GroupMember.findOneAndDelete({
    user_id: payload.data.user_id,
    group_id: payload.group.groupId,
    role: { $ne: "admin" },
  });

  if (!result) {
    throw new AppError(
      403,
      "You do not have permission to update this resource.",
    );
  }

  return result;
};

// ============ Group Invitation ===============
const sendGroupInvite = async (payload: {
  group: JwtGroupPayload;
  data: TSendGroupInvite;
}) => {
  const data = {
    group_id: payload.group.groupId,
    invite_by: payload.group.userId,
    invite_to: payload.data.invite_user_id,
    invite_at: new Date().toISOString(),
  };

  if (!(await User.findById(payload.data.invite_user_id))) {
    throw new AppError(404, "User not found!");
  }

  if (
    await GroupMember.findOne({
      group_id: payload.group.groupId,
      user_id: payload.data.invite_user_id,
    })
  ) {
    throw new AppError(400, "This member already exist in the group");
  }

  await GroupInvite.updateOne(
    {
      group_id: data.group_id,
      invite_by: data.invite_by,
      invite_to: data.invite_to,
    },
    data,
    { upsert: true },
  );

  const inviteToken = createGroupInviteToken(data);

  return { invite_token: inviteToken };
};

const acceptGroupInvitation = async (payload: {
  user: JwtPayload;
  data: TAcceptGroupInvite;
}) => {
  const decoded = verifyGroupInviteToken(payload.data.invite_token);

  // check acceptable user and invited user same
  if (payload.user.id !== decoded.invite_to) {
    throw new AppError(400, "Invalid accept request");
  }

  // checking "invite_by" is member of the group
  if (
    !(await GroupMember.findOne({
      group_id: decoded.group_id,
      user_id: decoded.invite_by,
    }))
  ) {
    throw new AppError(400, "Token not provide by group member");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // add group member
    const newMember = await GroupMember.create(
      [
        {
          group_id: decoded.group_id,
          user_id: decoded.invite_to,
          role: "member",
          join_at: new Date().toISOString(),
        },
      ],
      { session },
    );

    await GroupInvite.deleteOne(
      { group_id: decoded.group_id, invite_to: decoded.invite_to },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    return newMember;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, "Failed accept request, try again");
  }
};

const seeMyGroupsInvitations = async (payload: { user: JwtPayload }) => {
  const sending_invitations = await GroupInvite.find({
    invite_by: payload.user.id,
  });

  const acceptable_invitations = await GroupInvite.find({
    invite_to: payload.user.id,
  });

  return { sending_invitations, acceptable_invitations };
};

const cancelGroupInvitation = async (payload: {
  user: JwtPayload;
  invitation_id: string;
}) => {
  /**
   * check invitation is valid
   * delete invitation
   */

  const result = await GroupInvite.findOneAndDelete({
    _id: payload.invitation_id,
    $or: [{ invite_by: payload.user.id }, { invite_to: payload.user.id }],
  });

  if (!result) {
    throw new AppError(400, "Failed to cancel invitation, try again");
  }

  return result;
};

export const groupService = {
  getUserJoinedGroups,
  groupLogin,
  createNewGroup,
  getGroupDetails,
  updateGroup,
  seeGroupMembers,
  updateGroupMemberRole,
  removeGroupMember,
  sendGroupInvite,
  acceptGroupInvitation,
  seeMyGroupsInvitations,
  cancelGroupInvitation,
};
