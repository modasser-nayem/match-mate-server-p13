import AppError from "../../errors/AppError";
import { JwtGroupPayload } from "../../interface";
import { TAddExpense } from "./expense.interface";
import { Expense } from "./expense.model";

const addExpense = async (payload: {
  group: JwtGroupPayload;
  data: TAddExpense;
}) => {
  const newExpenseData = {
    group_id: payload.group.groupId,
    user_id: payload.group.userId,
    date: payload.data.date,
    category: payload.data.category,
    amount: payload.data.amount,
    note: payload.data.note,
  };

  const result = await Expense.create(newExpenseData);

  return result;
};

const updateExpense = async (payload: {
  group: JwtGroupPayload;
  expenseId: string;
  data: TAddExpense;
}) => {
  const expense = await Expense.findById(payload.expenseId);

  if (!expense) {
    throw new AppError(404, "Expense not found!");
  }

  // check this expense are req user expense
  if (payload.group.userId !== expense.user_id.toString()) {
    throw new AppError(
      403,
      "You do not have permission to update this resource.",
    );
  }

  // check status is approved
  if (expense.status === "approved") {
    throw new AppError(
      400,
      "This expense already Approved, you can't update it",
    );
  }

  let result;

  // if status is rejected
  if (expense.status === "rejected") {
    result = await Expense.findByIdAndUpdate(
      payload.expenseId,
      { ...payload.data, status: "pending" },
      {
        new: true,
      },
    );
  } else {
    result = await Expense.findByIdAndUpdate(payload.expenseId, payload.data, {
      new: true,
    });
  }

  return result;
};

export const expensesService = { addExpense, updateExpense };
