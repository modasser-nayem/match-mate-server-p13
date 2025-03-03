import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { groupAuth } from "../../middlewares/groupAuth";
import requestValidate from "../../middlewares/requestValidation";
import { expenseSchemaValidation } from "./expense.validation";
import { expensesController } from "./expense.controller";

const route = Router();

// Add new expense
route.post(
  "/",
  auth(),
  groupAuth(),
  requestValidate(expenseSchemaValidation.addExpense),
  expensesController.addExpense,
);

// Update expense
route.put(
  "/:id",
  auth(),
  groupAuth(),
  requestValidate(expenseSchemaValidation.updateExpense),
  expensesController.updateExpense,
);

// get all expenses
route.get("/", auth(), groupAuth(), expensesController.getAllExpenses);

// get my expenses
route.get("/my", auth(), groupAuth(), expensesController.getMyExpenses);

// Approve/reject an expense
route.put(
  "/status/:id",
  auth(),
  groupAuth("admin"),
  requestValidate(expenseSchemaValidation.updateExpenseStatus),
  expensesController.updateExpenseStatus,
);

// Delete expense
route.delete("/:id", auth(), groupAuth(), expensesController.deleteExpense);

export const expenseRoutes = route;
