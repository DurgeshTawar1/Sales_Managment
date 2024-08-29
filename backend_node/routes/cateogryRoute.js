import express from "express";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../controller/CategoryController.js";
import upload from "../config/multerConfig.js";

const categoryRoute = express.Router();


categoryRoute.post('/addCategory' , upload.single('image'), createCategory)
categoryRoute.get('/getallcategory' , getAllCategories)
categoryRoute.put('/editcategory/:id' , upload.single('image'), updateCategory)
categoryRoute.delete('/deletecategory/:id' , deleteCategory)


export default categoryRoute;



