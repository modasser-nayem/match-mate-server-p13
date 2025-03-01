import { ObjectId } from "mongoose";
import { z } from "zod";
import { groupSchemaValidation } from "./group.validation";

export interface IGroup {
  name: string;
  description: string;
  location: string;
  groupAdmin: ObjectId;
}

export type TCreateGroup = z.infer<typeof groupSchemaValidation.createGroup>;

export type TUpdateGroup = z.infer<typeof groupSchemaValidation.createGroup>;

export type TUpdateGroupMembers = z.infer<
  typeof groupSchemaValidation.createGroup
>;
