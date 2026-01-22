import express from "express";
import {
  listAttendance,
  getAttendance,
  createAttendance,
  updateAttendance,
} from "../controllers/hrController.js";
import { protect, requirePermission } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, requirePermission("hr.attendance.read"), listAttendance);
router.get("/:id", protect, requirePermission("hr.attendance.read"), getAttendance);
router.post("/", protect, requirePermission("hr.attendance.write"), createAttendance);
router.patch("/:id", protect, requirePermission("hr.attendance.write"), updateAttendance);

export default router;
