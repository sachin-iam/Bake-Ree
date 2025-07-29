import express from "express";
import { getAnalyticsData, getWeeklyStats } from "../controllers/analyticsController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📊 Admin Overview Analytics
router.get("/admin/overview", protect, adminOnly, getAnalyticsData);

// 📅 Weekly Orders & Revenue Analytics
router.get("/weekly", protect, adminOnly, getWeeklyStats);

export default router;
