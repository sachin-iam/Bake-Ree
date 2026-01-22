import express from "express";
import {
  getAllZones,
  getZoneById,
  createZone,
  updateZone,
  deleteZone,
  findZoneForCoordinates,
} from "../controllers/deliveryZoneController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================
// 🗺️ DELIVERY ZONE ROUTES
// ======================

// 🔍 Find zone for coordinates (Public - for order placement)
router.get("/find", findZoneForCoordinates);

// 📋 Get all zones (Admin only)
router.get("/", protect, adminOnly, getAllZones);

// 🔍 Get zone by ID (Admin only)
router.get("/:id", protect, adminOnly, getZoneById);

// ➕ Create new zone (Admin only)
router.post("/", protect, adminOnly, createZone);

// ✏️ Update zone (Admin only)
router.put("/:id", protect, adminOnly, updateZone);
router.patch("/:id", protect, adminOnly, updateZone);

// 🗑️ Delete zone (Admin only)
router.delete("/:id", protect, adminOnly, deleteZone);

export default router;

