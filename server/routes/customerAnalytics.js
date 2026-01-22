import express from "express";
import {
  getMyAnalytics,
  getCustomerAnalyticsById,
  getMyMonthlySpending,
  recalculateMyAnalytics,
} from "../controllers/customerAnalyticsController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer analytics routes (protected)
router.get("/me", protect, getMyAnalytics);
router.get("/me/monthly", protect, getMyMonthlySpending);
router.post("/me/recalculate", protect, recalculateMyAnalytics);

// Admin routes
router.get("/:userId", protect, adminOnly, getCustomerAnalyticsById);

export default router;

