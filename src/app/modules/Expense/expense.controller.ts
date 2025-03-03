import { catchAsync } from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import { expensesService } from "./expense.service";

const addExpense = catchAsync(async (req, res) => {
  const result = await expensesService.addExpense({
    group: req.group,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
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

export const expensesController = { addExpense, updateExpense };
