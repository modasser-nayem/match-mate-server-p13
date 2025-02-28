import { z } from "zod";

const updateProfile = z.object({
  name: z
    .string()
    .refine((value) => value !== "", { message: "name is empty" })
    .optional(),
  email: z.string().email({ message: "invalid email address" }).optional(),
  contact: z
    .string()
    .refine((value) => value !== "", { message: "contact is empty" })
    .optional(),
  profile_picture: z
    .string()
    .refine((value) => value !== "", { message: "profile_picture is empty" })
    .optional(),
});

export const userSchemaValidation = { updateProfile };
