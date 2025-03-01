import { z } from "zod";

const createGroup = z.object({
  name: z
    .string({ required_error: "name is required" })
    .refine((value) => value !== "", { message: "name is required" }),
  description: z
    .string({ required_error: "description is required" })
    .refine((value) => value !== "", { message: "description is required" }),
  location: z
    .string({ required_error: "location is required" })
    .refine((value) => value !== "", { message: "location is required" }),
});

const updateGroup = z.object({
  name: z
    .string()
    .refine((value) => value !== "", { message: "name is required" })
    .optional(),
  description: z
    .string()
    .refine((value) => value !== "", { message: "description is required" })
    .optional(),
  location: z
    .string()
    .refine((value) => value !== "", { message: "location is required" })
    .optional(),
});

const updateGroupMemberRole = z.object({
  user_id: z
    .string({ required_error: "user_id is required" })
    .refine((value) => value !== "", { message: "user_id is required" }),
  role: z.enum(["admin"], { required_error: "role is required" }),
});

const removeGroupMember = z.object({
  user_id: z
    .string({ required_error: "user_id is required" })
    .refine((value) => value !== "", { message: "user_id is required" }),
});

export const groupSchemaValidation = {
  createGroup,
  updateGroup,
  updateGroupMemberRole,
  removeGroupMember,
};
