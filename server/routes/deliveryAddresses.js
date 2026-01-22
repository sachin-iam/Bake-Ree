import express from "express";
import {
  getUserAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/deliveryAddressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================
// 📍 DELIVERY ADDRESS ROUTES
// ======================

// 📋 Get all addresses for logged-in user
router.get("/", protect, getUserAddresses);

// 🔍 Get address by ID
router.get("/:id", protect, getAddressById);

// ➕ Create new address
router.post("/", protect, createAddress);

// ✏️ Update address
router.put("/:id", protect, updateAddress);
router.patch("/:id", protect, updateAddress);

// 🗑️ Delete address
router.delete("/:id", protect, deleteAddress);

// ⭐ Set default address
router.patch("/:id/default", protect, setDefaultAddress);
router.put("/:id/default", protect, setDefaultAddress);

export default router;

