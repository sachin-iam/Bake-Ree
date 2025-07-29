// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // ✅ allow frontend access
app.use(express.json()); // ✅ parse JSON body

// Route Imports
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import authRoutes from "./routes/auth.js";
import analyticsRoutes from "./routes/analytics.js";
import customerRoutes from "./routes/customerRoutes.js"; // ✅ customer routes

// Route Mounts
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/customers", customerRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🍞 Bake Ree API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
