import express from "express";
import { listShifts, getShift, createShift, updateShift } from "../controllers/hrController.js";
import { protect, requirePermission } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, requirePermission("hr.shifts.read"), listShifts);
router.get("/:id", protect, requirePermission("hr.shifts.read"), getShift);
router.post("/", protect, requirePermission("hr.shifts.write"), createShift);
router.patch("/:id", protect, requirePermission("hr.shifts.write"), updateShift);

export default router;
