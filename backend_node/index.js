import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';
import connectToDatabase from "./config/db.js";
import customerRoute from "./routes/customerRoute.js";
import categoryRoute from "./routes/cateogryRoute.js";
import expenseRoute from "./routes/expenseRoute.js";
import incomeRoute from "./routes/incomeRoute.js";
import supplierRoute from "./routes/supplierRoute.js";
import purchaseRoute from "./routes/purchaseRoute.js";
import productRoutes from "./routes/productRoute.js";
import Salerouter from "./routes/salesRoute.js";

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: 'http://localhost:8080', 
    credentials: true,
}));
app.use(bodyParser.json());
// Use routes
app.use("/api/v1/customer", customerRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/expense", expenseRoute);
app.use("/api/v1/income", incomeRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/sale", Salerouter);

// Connect to the database
connectToDatabase();

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`);
});
