import { z } from "zod";

const register = z
  .object({
    name: z
      .string({ required_error: "name is required" })
      .refine((value) => value !== "", { message: "name is required" }),
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "invalid email address" }),
    // contact: z
    //   .string()
    //   .refine((value) => value !== "", { message: "contact is required" })
    //   .optional(),
    password: z
      .string({ required_error: "password is required" })
      .refine((value) => value !== "", { message: "password is required" })
      .refine((value) => value.length >= 6, {
        message: "password must be more then 5 character",
      }),
    confirmPassword: z
      .string({ required_error: "confirmPassword is required" })
      .refine((value) => value !== "", {
        message: "confirmPassword is required",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const login = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" })
    .refine((value) => value !== "", { message: "email is required" }),
  password: z
    .string({ required_error: "password is required" })
    .refine((value) => value !== "", { message: "password is required" }),
});

const changePassword = z
  .object({
    currentPassword: z
      .string({ required_error: "currentPassword is required" })
      .refine((value) => value !== "", {
        message: "current password is required",
      }),
    newPassword: z
      .string({ required_error: "newPassword is required" })
      .refine((value) => value !== "", { message: "new password is required" })
      .refine((value) => value.length >= 6, {
        message: "password must be more then 5 character",
      }),
    confirmPassword: z
      .string({ required_error: "confirmPassword is required" })
      .refine((value) => value !== "", {
        message: "confirmPassword is required",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirm Passwords don't match",
    path: ["confirmPassword"],
  });

export const authSchemaValidation = {
  register,
  login,
  changePassword,
};
