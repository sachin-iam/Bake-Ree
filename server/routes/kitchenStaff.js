import express from "express";
import {
  getKitchenStaff,
  createKitchenStaff,
  updateKitchenStaff,
  deleteKitchenStaff,
  getKitchenStaffStats,
} from "../controllers/kitchenStaffController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all kitchen staff (admin only)
router.get("/", protect, adminOnly, getKitchenStaff);

// Get kitchen staff statistics (admin only)
router.get("/stats", protect, adminOnly, getKitchenStaffStats);

// Create new kitchen staff (admin only)
router.post("/", protect, adminOnly, createKitchenStaff);

// Update kitchen staff (admin only)
router.put("/:id", protect, adminOnly, updateKitchenStaff);

// Delete kitchen staff (admin only)
router.delete("/:id", protect, adminOnly, deleteKitchenStaff);

export default router;


