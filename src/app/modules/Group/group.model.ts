import { model, Schema } from "mongoose";
import { IGroup, IGroupMember } from "./group.interface";

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
