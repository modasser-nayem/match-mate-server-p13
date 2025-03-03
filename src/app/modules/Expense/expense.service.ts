import AppError from "../../errors/AppError";
import { JwtGroupPayload } from "../../interface";
import { TAddExpense, TUpdateExpenseStatus } from "./expense.interface";
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
        projection: { __v: 0 },
        new: true,
      },
    );
  } else {
    result = await Expense.findByIdAndUpdate(payload.expenseId, payload.data, {
      projection: { __v: 0 },
      new: true,
    });
  }

  return result;
};

const getAllExpenses = async (payload: { group: JwtGroupPayload }) => {
  const result = await Expense.find(
    { group_id: payload.group.groupId, status: "approved" },
    { __v: 0 },
  );

  return result;
};

const getMyExpenses = async (payload: { group: JwtGroupPayload }) => {
  const result = await Expense.find(
    {
      group_id: payload.group.groupId,
      user_id: payload.group.userId,
    },
    { __v: 0 },
  );

  return result;
};

const updateExpenseStatus = async (payload: {
  group: JwtGroupPayload;
  expense_id: string;
  data: TUpdateExpenseStatus;
}) => {
  const expense = await Expense.findById(payload.expense_id);

  if (!expense) {
    throw new AppError(404, "Expense not found!");
  }

  // ensure this expense belong to this group.
  if (expense.group_id.toString() !== payload.group.groupId) {
    throw new AppError(403, "Expense not belong to this group");
  }

  // check expense status
  if (expense.status === "approved" || expense.status === "rejected") {
    throw new AppError(
      400,
      `This an ${expense.status} expense, you can't change status`,
    );
  }

  const result = await Expense.findByIdAndUpdate(
    payload.expense_id,
    payload.data,
    {
      projection: { __v: 0 },
      new: true,
    },
  );

  return result;
};

const deleteExpense = async (payload: {
  group: JwtGroupPayload;
  expense_id: string;
}) => {
  const expense = await Expense.findById(payload.expense_id);

  if (!expense) {
    throw new AppError(404, "Expense not found!");
  }

  // ensure this expense belong to correct user and group.
  if (
    expense.user_id.toString() !== payload.group.userId ||
    expense.group_id.toString() !== payload.group.groupId
  ) {
    throw new AppError(
      403,
      "This expense is not belongs to this user or group",
    );
  }

  // check is approved
  if (expense.status === "approved") {
    throw new AppError(400, "This an Approved expense, you can't delete it");
  }

  // delete expense
  await Expense.deleteOne({ _id: payload.expense_id });

  return null;
};

export const expensesService = {
  addExpense,
  updateExpense,
  getAllExpenses,
  getMyExpenses,
  updateExpenseStatus,
  deleteExpense,
};
