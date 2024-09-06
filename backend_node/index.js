import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
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
const httpServer = createServer(app);

// Middleware to parse JSON bodies
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL in production
    credentials: true,
  })
);
app.use(bodyParser.json());

const io = new Server(httpServer, {
  cors: {
    origin: "*", // Replace with your frontend URL in production
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (message) => {
    io.emit("message", message); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

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
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
