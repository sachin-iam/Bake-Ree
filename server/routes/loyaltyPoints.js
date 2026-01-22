import express from "express";
import {
  getMyPointsBalance,
  getMyPointsHistory,
  redeemMyPoints,
  awardBonusPointsToUser,
} from "../controllers/loyaltyPointsController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer routes (protected)
router.get("/balance", protect, getMyPointsBalance);
router.get("/history", protect, getMyPointsHistory);
router.post("/redeem", protect, redeemMyPoints);

// Admin routes
router.post("/bonus/:userId", protect, adminOnly, awardBonusPointsToUser);

export default router;

