import Product from '../modles/ProductModel.js';
import cloudinary from '../config/cloudinaryConfig.js';
import fs from 'fs';

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const {
            productName,
            quantityType,
            sku,
            barcode,
            productExpiry,
            quantity,
            productCost,
            sellPrice,
            category,
            productLimitNumber,
            notes,
            storePrice
        } = req.body;

        let imageUrl = null;
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'products',
                transformation: [
                    { width: 500, height: 500, crop: 'limit' },
                    { fetch_format: 'auto', quality: 'auto' }
                ]
            });

            fs.unlinkSync(req.file.path);
            imageUrl = uploadResult.secure_url;
        }

        const product = new Product({
            productName,
            quantityType,
            sku,
            barcode,
            productExpiry,
            quantity,
            productCost,
            sellPrice,
            category,
            productLimitNumber,
            notes,
            storePrice,
            image: imageUrl
        });

        await product.save();

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'products',
                transformation: [
                    { width: 500, height: 500, crop: 'limit' },
                    { fetch_format: 'auto', quality: 'auto' }
                ]
            });

            fs.unlinkSync(req.file.path);
            updateData.image = uploadResult.secure_url;
        }

        const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
