import { z } from "zod";

const addExpense = z.object({
  amount: z
    .number({ required_error: "amount is required" })
    .min(5, "Amount minium 5 taka"),
  category: z.enum(
    [
      "Food & Groceries",
      "Utilities & Bills",
      "Rent & Maintenance",
      "Household Supplies",
    ],
    { required_error: "category is required" },
  ),
  date: z
    .string({ required_error: "date is required" })
    .refine((value) => value !== "", { message: "date is required" }),
  note: z
    .string({ required_error: "note is required" })
    .refine((value) => value !== "", { message: "note is required" }),
});

const updateExpense = z.object({
  amount: z.number().min(5, "Amount minium 5 taka").optional(),
  category: z
    .enum([
      "Food & Groceries",
      "Utilities & Bills",
      "Rent & Maintenance",
      "Household Supplies",
    ])
    .optional(),
  date: z
    .string()
    .refine((value) => value !== "", { message: "date is required" })
    .optional(),
  note: z
    .string()
    .refine((value) => value !== "", { message: "note is required" })
    .optional(),
});

const updateExpenseStatus = z.object({
  status: z.enum(["approved", "rejected"], {
    required_error: "status is required",
  }),
});

export const expenseSchemaValidation = {
  addExpense,
  updateExpense,
  updateExpenseStatus,
};
