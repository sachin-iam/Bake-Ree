import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "../controllers/notificationPreferencesController.js";

const router = express.Router();

// Get notification preferences
router.get("/", protect, getNotificationPreferences);

// Update notification preferences
router.put("/", protect, updateNotificationPreferences);

export default router;

