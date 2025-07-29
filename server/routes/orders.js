import express from "express";
import {
  createOrder,
  getUserOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getKitchenOrders,
  getAllOrders,
  getStatusDistribution,
  getTypeRevenue,
  getRecentOrders
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================
// 🛒 ORDER ROUTES
// ======================

// ➕ Place a new order (User only)
router.post("/", protect, createOrder);

// 👤 Get all orders of logged-in user (legacy)
router.get("/user", protect, getUserOrders);

// ✅ Recommended alias for logged-in user orders
router.get("/my-orders", protect, getMyOrders);

// 🛡️ Admin: Get all orders
router.get("/all", protect, adminOnly, getAllOrders);

// 👨‍🍳 Kitchen: Get Pending/Preparing/Ready orders
router.get("/kitchen", protect, adminOnly, getKitchenOrders);

// ======================
// 📊 ANALYTICS ROUTES (Order-sensitive placement)
// ======================

// 🕑 Get recent orders for analytics overview panel
router.get("/recent", protect, adminOnly, getRecentOrders);

// 📈 Get status distribution of all orders 
router.get("/status-distribution", protect, adminOnly, getStatusDistribution);

// 💰 Get revenue by order type
router.get("/type-revenue", protect, adminOnly, getTypeRevenue);

// ======================
// 🧾 Catch-all dynamic route should be LAST
// ======================

// 🔍 Get order by ID (user or admin)
router.get("/:id", protect, getOrderById);

// ✅ Update order status (admin or kitchen)
router.patch("/:id/status", protect, adminOnly, updateOrderStatus);

// ✅ Final export
export default router;
