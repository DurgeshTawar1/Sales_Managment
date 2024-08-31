import Sales from "../modles/SalesModel.js";
import cloudinary from "../config/cloudinaryConfig.js";
import path from 'path';
import fs from 'fs';

// Create a new sale
export const createSale = async (req, res) => {
    try {
        console.log(req.body)
        const {
            customer, date, newProduct, qty, price, total, discount, tax, shipping,
            discountFlat, taxFlat, customerPaid, notes, orderNo, status, paymentType
        } = req.body;

        // Handle image upload
        let uploadImage = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            uploadImage = result.secure_url;
            
            // Remove file from local directory after uploading
            fs.unlinkSync(req.file.path);
        }

        const newSale = new Sales({
            customer, date, newProduct, qty, price, total, discount, tax, shipping,
            discountFlat, taxFlat, customerPaid, notes, orderNo, status, paymentType,
            uploadImage
        });

        const savedSale = await newSale.save();
        res.status(201).json(savedSale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all sales
export const getAllSales = async (req, res) => {
    try {
        const sales = await Sales.find();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single sale by ID
export const getSaleById = async (req, res) => {
    try {
        const sale = await Sales.findById(req.params.id);
        if (!sale) return res.status(404).json({ message: 'Sale not found' });
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a sale by ID
export const updateSale = async (req, res) => {
    try {
        const {
            customer, date, newProduct, qty, price, total, discount, tax, shipping,
            discountFlat, taxFlat, customerPaid, notes, orderNo, status, paymentType
        } = req.body;

        // Handle image upload
        let uploadImage = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            uploadImage = result.secure_url;
            
            // Remove file from local directory after uploading
            fs.unlinkSync(req.file.path);
        }

        const updatedSale = await Sales.findByIdAndUpdate(
            req.params.id,
            {
                customer, date, newProduct, qty, price, total, discount, tax, shipping,
                discountFlat, taxFlat, customerPaid, notes, orderNo, status, paymentType,
                uploadImage
            },
            { new: true }
        );

        if (!updatedSale) return res.status(404).json({ message: 'Sale not found' });

        res.status(200).json(updatedSale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a sale by ID
export const deleteSale = async (req, res) => {
    try {
        const deletedSale = await Sales.findByIdAndDelete(req.params.id);
        if (!deletedSale) return res.status(404).json({ message: 'Sale not found' });
        res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
