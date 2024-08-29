import express from "express";
import { addExpense, deleteExpense, getAllExpenses, getExpenseById, updateExpense } from "../controller/ExpenseController.js";

const expenseRoute = express.Router();

expenseRoute.post('/addExpense', addExpense);
expenseRoute.get('/getAllExpense', getAllExpenses);
expenseRoute.get('/getExpense/:id', getExpenseById);
expenseRoute.put("/updateExpense/:id", updateExpense);
expenseRoute.delete("/deleteExpense/:id", deleteExpense);


export default expenseRoute;
