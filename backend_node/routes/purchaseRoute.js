import express from "express";
import { addPurchase, deletePurchase, getAllPurchase, getPurchaseById, updatePurchase } from "../controller/PurchaseController.js";

const purchaseRoute = express.Router();

purchaseRoute.post('/addPurchase', addPurchase);
purchaseRoute.get('/getAllPurchase', getAllPurchase);
purchaseRoute.get('/getPurchase/:id', getPurchaseById);
purchaseRoute.put("/updatePurchase/:id", updatePurchase);
purchaseRoute.delete("/deletePurchase/:id", deletePurchase);


export default purchaseRoute;
