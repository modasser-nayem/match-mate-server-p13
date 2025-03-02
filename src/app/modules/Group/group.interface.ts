import { z } from "zod";
import { groupSchemaValidation } from "./group.validation";
import { ObjectId } from "mongoose";

// ============ Group ===============
export interface IGroup {
  name: string;
  description: string;
  location: string;
}

export type TCreateGroup = z.infer<typeof groupSchemaValidation.createGroup>;

export type TUpdateGroup = z.infer<typeof groupSchemaValidation.createGroup>;

// ============ GroupMember ===============
export type TGroupMemberRole = "admin" | "member";

export interface IGroupMember {
  user_id: ObjectId;
  group_id: ObjectId;
  role: TGroupMemberRole;
  join_at: string;
}

export type TUpdateGroupMemberRole = z.infer<
  typeof groupSchemaValidation.updateGroupMemberRole
>;

export type TRemoveGroupMember = z.infer<
  typeof groupSchemaValidation.removeGroupMember
>;

// ============ Group Invitation ===============
export interface IGroupInvite {
  group_id: ObjectId;
  invite_by: ObjectId;
  invite_to: ObjectId;
  invite_at: string;
}

export type TSendGroupInvite = z.infer<
  typeof groupSchemaValidation.sendGroupInvite
>;

export type TAcceptGroupInvite = z.infer<
  typeof groupSchemaValidation.acceptGroupInvitation
>;
