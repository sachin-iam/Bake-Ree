import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
  getWishlistCount,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get user's wishlist
router.get("/", getWishlist);

// Get wishlist count
router.get("/count", getWishlistCount);

// Check if product is in wishlist
router.get("/check/:productId", checkWishlist);

// Add product to wishlist
router.post("/", addToWishlist);

// Remove product from wishlist
router.delete("/:productId", removeFromWishlist);

export default router;

