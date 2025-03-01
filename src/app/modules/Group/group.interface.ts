import { z } from "zod";
import { groupSchemaValidation } from "./group.validation";
import { ObjectId } from "mongoose";

export interface IGroup {
  name: string;
  description: string;
  location: string;
}

export type TGroupMemberRole = "admin" | "member";

export interface IGroupMember {
  user_id: ObjectId;
  group_id: ObjectId;
  role: TGroupMemberRole;
  join_at: string;
}

export type TCreateGroup = z.infer<typeof groupSchemaValidation.createGroup>;

export type TUpdateGroup = z.infer<typeof groupSchemaValidation.createGroup>;

export type TUpdateGroupMemberRole = z.infer<
  typeof groupSchemaValidation.updateGroupMemberRole
>;

export type TRemoveGroupMember = z.infer<
  typeof groupSchemaValidation.removeGroupMember
>;
