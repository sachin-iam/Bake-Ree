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
import { protect, adminOnly, kitchenStaffOrAdmin } from "../middleware/authMiddleware.js";

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
router.get("/all", getAllOrders);

// 👨‍🍳 Kitchen: Get Pending/Preparing/Ready orders (kitchen staff or admin)
router.get("/kitchen", protect, kitchenStaffOrAdmin, getKitchenOrders);

// ======================
// 📊 ANALYTICS ROUTES (Order-sensitive placement)
// ======================

// 🕑 Get recent orders for analytics overview panel
router.get("/recent", getRecentOrders);

// 📈 Get status distribution of all orders 
router.get("/status-distribution", getStatusDistribution);

// 💰 Get revenue by order type
router.get("/type-revenue", getTypeRevenue);

// ======================
// 🧾 Catch-all dynamic route should be LAST
// ======================

// 🔍 Get order by ID (user or admin) - protected route
router.get("/:id", protect, getOrderById);

// ✅ Update order status (admin or kitchen) - PUT route for client compatibility
router.put("/:id", protect, kitchenStaffOrAdmin, updateOrderStatus);

// ✅ Update order status (admin or kitchen) - PATCH route
router.patch("/:id/status", protect, kitchenStaffOrAdmin, updateOrderStatus);

// ✅ Final export
export default router;
