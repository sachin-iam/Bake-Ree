import express from "express";
import {
  getAllProducts,
  getFeaturedProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🟢 Public routes
router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);

// 🔐 Admin-only routes
router.post("/", protect, adminOnly, addProduct);
router.put("/:id", protect, adminOnly, updateProduct);     // Full update
router.patch("/:id", protect, adminOnly, updateProduct);   // Partial update
router.delete("/:id", protect, adminOnly, deleteProduct);

// ✅ Proper ESM export
export default router;
