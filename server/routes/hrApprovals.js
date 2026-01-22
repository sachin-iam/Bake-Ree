import express from "express";
import { listApprovals, getApproval, createApproval, updateApproval } from "../controllers/hrController.js";
import { protect, requirePermission } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, requirePermission("hr.approvals.read"), listApprovals);
router.get("/:id", protect, requirePermission("hr.approvals.read"), getApproval);
router.post("/", protect, requirePermission("hr.approvals.write"), createApproval);
router.patch("/:id", protect, requirePermission("hr.approvals.write"), updateApproval);

export default router;
