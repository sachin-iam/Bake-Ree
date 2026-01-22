import express from "express";
import {
  getUserAddresses,
  getAddressById,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all addresses for user
router.get("/", getUserAddresses);

// Get specific address
router.get("/:id", getAddressById);

// Add new address
router.post("/", addAddress);

// Update address
router.put("/:id", updateAddress);

// Delete address
router.delete("/:id", deleteAddress);

// Set default address
router.patch("/:id/set-default", setDefaultAddress);

export default router;

