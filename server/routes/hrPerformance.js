import express from "express";
import {
  listPerformanceReviews,
  getPerformanceReview,
  createPerformanceReview,
  updatePerformanceReview,
} from "../controllers/hrController.js";
import { protect, requirePermission } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, requirePermission("hr.performance.read"), listPerformanceReviews);
router.get("/:id", protect, requirePermission("hr.performance.read"), getPerformanceReview);
router.post("/", protect, requirePermission("hr.performance.write"), createPerformanceReview);
router.patch("/:id", protect, requirePermission("hr.performance.write"), updatePerformanceReview);

export default router;
