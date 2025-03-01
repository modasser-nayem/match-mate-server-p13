import { z } from "zod";

const createGroup = z.object({});

const updateGroup = z.object({});

const updateGroupMembers = z.object({});

export const groupSchemaValidation = {
  createGroup,
  updateGroup,
  updateGroupMembers,
};
