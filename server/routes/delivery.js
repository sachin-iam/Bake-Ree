import express from "express";
import {
  getAllDeliveries,
  getDeliveryById,
  getDeliveryByOrderId,
  createDelivery,
  updateDeliveryStatus,
  assignDeliveryStaff,
  getStaffDeliveries,
  getDeliveryStats,
  updateDeliveryLocation,
} from "../controllers/deliveryController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================
// 🚚 DELIVERY ROUTES
// ======================

// 📊 Get delivery statistics (Admin only)
router.get("/stats", protect, adminOnly, getDeliveryStats);

// 📋 Get all deliveries (Admin only)
router.get("/", protect, adminOnly, getAllDeliveries);

// 🔍 Get delivery by ID
router.get("/:id", protect, getDeliveryById);

// 🔍 Get delivery by order ID
router.get("/order/:orderId", protect, getDeliveryByOrderId);

// ➕ Create delivery for an order (Admin only)
router.post("/", protect, adminOnly, createDelivery);

// ✅ Update delivery status
router.patch("/:id/status", protect, updateDeliveryStatus);
router.put("/:id/status", protect, updateDeliveryStatus);

// 👤 Assign delivery staff (Admin only)
router.patch("/:id/assign", protect, adminOnly, assignDeliveryStaff);
router.put("/:id/assign", protect, adminOnly, assignDeliveryStaff);

// 📍 Update delivery location (Delivery staff)
router.patch("/:id/location", protect, updateDeliveryLocation);
router.put("/:id/location", protect, updateDeliveryLocation);

// 📦 Get deliveries assigned to staff member
router.get("/staff/:staffId", protect, getStaffDeliveries);

export default router;

