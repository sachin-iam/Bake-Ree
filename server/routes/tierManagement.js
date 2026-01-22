import express from "express";
import {
  getAllUsersWithTiers,
  getUserTierInfo,
  updateUserTier,
  recalculateUserTier,
  getTierUpdateIssues,
  getTierStatistics,
} from "../controllers/tierManagementController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require admin access
router.use(protect, adminOnly);

// Get all users with their tiers
router.get("/users", getAllUsersWithTiers);

// Get tier statistics
router.get("/statistics", getTierStatistics);

// Get tier update issues
router.get("/issues", getTierUpdateIssues);

// Get specific user's tier info
router.get("/users/:userId", getUserTierInfo);

// Manually update user's tier
router.put("/users/:userId/tier", updateUserTier);

// Force recalculation of user's tier
router.post("/users/:userId/recalculate", recalculateUserTier);

export default router;


