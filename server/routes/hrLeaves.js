import express from "express";
import {
  listLeaveRequests,
  getLeaveRequest,
  createLeaveRequest,
  updateLeaveRequest,
  approveLeaveRequest,
  rejectLeaveRequest,
} from "../controllers/hrController.js";
import { protect, requirePermission } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, requirePermission("hr.leave.read"), listLeaveRequests);
router.get("/:id", protect, requirePermission("hr.leave.read"), getLeaveRequest);
router.post("/", protect, requirePermission("hr.leave.write"), createLeaveRequest);
router.patch("/:id", protect, requirePermission("hr.leave.write"), updateLeaveRequest);
router.post("/:id/approve", protect, requirePermission("hr.leave.approve"), approveLeaveRequest);
router.post("/:id/reject", protect, requirePermission("hr.leave.approve"), rejectLeaveRequest);

export default router;
