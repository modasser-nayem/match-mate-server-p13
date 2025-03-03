import { catchAsync } from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import { expensesService } from "./expense.service";

const addExpense = catchAsync(async (req, res) => {
  const result = await expensesService.addExpense({
    group: req.group,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Expense Successfully Added",
    data: result,
  });
});

const updateExpense = catchAsync(async (req, res) => {
  const result = await expensesService.updateExpense({
    group: req.group,
    expenseId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Expense Successfully Updated",
    data: result,
  });
});

const getAllExpenses = catchAsync(async (req, res) => {
  const result = await expensesService.getAllExpenses({
    group: req.group,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all expenses",
    data: result,
  });
});

const getMyExpenses = catchAsync(async (req, res) => {
  const result = await expensesService.getMyExpenses({
    group: req.group,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved my all expenses",
    data: result,
  });
});

const updateExpenseStatus = catchAsync(async (req, res) => {
  const result = await expensesService.updateExpenseStatus({
    group: req.group,
    expense_id: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Expenses successfully ${result?.status}`,
    data: result,
  });
});

const deleteExpense = catchAsync(async (req, res) => {
  const result = await expensesService.deleteExpense({
    group: req.group,
    expense_id: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Expense Successfully Deleted",
    data: result,
  });
});

export const expensesController = {
  addExpense,
  updateExpense,
  getAllExpenses,
  getMyExpenses,
  updateExpenseStatus,
  deleteExpense,
};
