import Wishlist from "../models/Wishlist.js";

/**
 * Get user's wishlist
 * GET /api/wishlist
 */
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlistItems = await Wishlist.find({ user: userId })
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json(wishlistItems);
  } catch (error) {
    console.error("Error getting wishlist:", error);
    res.status(500).json({ error: "Failed to get wishlist" });
  }
};

/**
 * Add product to wishlist
 * POST /api/wishlist
 */
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    // Check if already in wishlist
    const existing = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (existing) {
      return res.status(409).json({ error: "Product already in wishlist" });
    }

    const wishlistItem = await Wishlist.create({
      user: userId,
      product: productId,
    });

    await wishlistItem.populate("product");

    res.status(201).json({
      message: "Product added to wishlist",
      wishlistItem,
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    if (error.code === 11000) {
      return res.status(409).json({ error: "Product already in wishlist" });
    }
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
};

/**
 * Remove product from wishlist
 * DELETE /api/wishlist/:productId
 */
export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const wishlistItem = await Wishlist.findOneAndDelete({
      user: userId,
      product: productId,
    });

    if (!wishlistItem) {
      return res.status(404).json({ error: "Product not found in wishlist" });
    }

    res.status(200).json({
      message: "Product removed from wishlist",
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
};

/**
 * Check if product is in wishlist
 * GET /api/wishlist/check/:productId
 */
export const checkWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const wishlistItem = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    res.status(200).json({
      inWishlist: !!wishlistItem,
    });
  } catch (error) {
    console.error("Error checking wishlist:", error);
    res.status(500).json({ error: "Failed to check wishlist" });
  }
};

/**
 * Get wishlist count
 * GET /api/wishlist/count
 */
export const getWishlistCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const count = await Wishlist.countDocuments({ user: userId });

    res.status(200).json({ count });
  } catch (error) {
    console.error("Error getting wishlist count:", error);
    res.status(500).json({ error: "Failed to get wishlist count" });
  }
};

export default {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
  getWishlistCount,
};

