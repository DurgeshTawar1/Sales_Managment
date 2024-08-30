import express from "express";
import upload from "../config/multerConfig.js";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controller/ProductController.js";

const productRoutes = express.Router();


productRoutes.post('/addproduct', upload.single('image'), createProduct);
productRoutes.get('/getallproduct' , getAllProducts)
productRoutes.put('/editproduct/:id' , upload.single('image'), updateProduct)
productRoutes.delete('/deleteproduct/:id' , deleteProduct)


export default productRoutes;



