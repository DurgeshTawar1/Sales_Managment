import express from "express";
import { addSupplier, deleteSupplier, getAllSupplier, getSupplierById, updateSupplier } from "../controller/SupplierController.js";

const supplierRoute = express.Router();

supplierRoute.post('/addSupplier', addSupplier);
supplierRoute.get('/getAllSupplier', getAllSupplier);
supplierRoute.get('/getSupplier/:id', getSupplierById);
supplierRoute.put("/updateSupplier/:id", updateSupplier);
supplierRoute.delete("/deleteSupplier/:id", deleteSupplier);


export default supplierRoute;
