import { ObjectId } from "mongoose";
import { z } from "zod";
import { expenseSchemaValidation } from "./expense.validation";

export type TExpenseStatus = "pending" | "approved" | "rejected";

export interface IExpense {
  group_id: ObjectId;
  user_id: ObjectId;
  date: string;
  category: string;
  amount: number;
  note: string;
  status: TExpenseStatus;
}

export type TAddExpense = z.infer<typeof expenseSchemaValidation.addExpense>;

export type TUpdateExpense = z.infer<
  typeof expenseSchemaValidation.updateExpense
>;
