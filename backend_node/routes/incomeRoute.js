import express from "express";
import { addIncome, deleteIncome, getAllIncome, getIncomeById, updateIncome } from "../controller/IncomeController.js";

const incomeRoute = express.Router();

incomeRoute.post('/addIncome', addIncome);
incomeRoute.get('/getAllIncome', getAllIncome);
incomeRoute.get('getIncome/:id', getIncomeById);
incomeRoute.put("/updateIncome/:id", updateIncome);
incomeRoute.delete("/deleteIncome/:id", deleteIncome);


export default incomeRoute;
