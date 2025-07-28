// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB(); // uses the URI from .env

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route Imports
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");

// Route Mounts
app.use("/api/products", productRoutes);   // 🛍️ Product-related endpoints
app.use("/api/orders", orderRoutes);       // 🧾 Order creation, kitchen, status, analytics
app.use("/api", authRoutes);               // 🔐 Auth routes: login, signup, etc.

// Test Route
app.get("/", (req, res) => {
  res.send("🍞 Bake Ree API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const analyticsRoutes = require('./routes/analytics');
app.use('/api/analytics', analyticsRoutes);
