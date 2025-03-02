import { model, Schema } from "mongoose";
import { IGroup, IGroupInvite, IGroupMember } from "./group.interface";

// ============ Group ===============
const groupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Group = model<IGroup>("Group", groupSchema);

// ============ GroupMember ===============
const groupMemberSchema = new Schema<IGroupMember>({
  user_id: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  group_id: {
    type: Schema.ObjectId,
    ref: "Group",
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "member"],
    },
    default: "member",
  },
  join_at: {
    type: String,
    required: true,
  },
});

export const GroupMember = model<IGroupMember>(
  "GroupMember",
  groupMemberSchema,
);

// ============ GroupInvite ===============
const groupInviteSchema = new Schema<IGroupInvite>({
  group_id: {
    type: Schema.ObjectId,
    ref: "Group",
    required: true,
  },
  invite_to: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  invite_by: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  invite_at: {
    type: String,
    required: true,
  },
});

export const GroupInvite = model<IGroupInvite>(
  "GroupInvite",
  groupInviteSchema,
);
