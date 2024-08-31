import express from 'express';
import upload from '../config/multerConfig.js';
import { createSale, deleteSale, getAllSales, getSaleById, updateSale } from '../controller/SalesController.js';




const Salerouter = express.Router();

// Create a new sale with image upload
Salerouter.post('/addsale', upload.single('uploadImage'), createSale);

// Get all sales
Salerouter.get('/getAllSale', getAllSales);

// Get a single sale by ID
Salerouter.get('/getsale/:id', getSaleById);

// Update a sale by ID with image upload
Salerouter.put('/updatesale/:id', upload.single('uploadImage'), updateSale);

// Delete a sale by ID
Salerouter.delete('/deletesale/:id', deleteSale);

export default Salerouter;
