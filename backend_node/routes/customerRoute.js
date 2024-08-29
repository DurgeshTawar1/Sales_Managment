import express from "express";
import { createCustomer, deleteCustomerById, getAllCustomers, updateCustomerById } from "../controller/CustomerController.js";


const customerRoute = express.Router();


customerRoute.post("/addcustomer", createCustomer);
customerRoute.get("/getallcustomer", getAllCustomers);
customerRoute.put("/editcustomer/:id", updateCustomerById);
customerRoute.delete("/deletecustomer/:id", deleteCustomerById);



export default customerRoute;


