import { model, Schema } from "mongoose";
import { IExpense } from "./expense.interface";

const expenseSchema = new Schema<IExpense>({
  group_id: {
    type: Schema.ObjectId,
    ref: "Group",
    required: true,
  },
  user_id: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "approved", "rejected"],
    },
    default: "pending",
  },
});

export const Expense = model<IExpense>("Expense", expenseSchema);
