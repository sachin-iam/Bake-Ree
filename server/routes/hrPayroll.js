import express from "express";
import {
  listPayrollRuns,
  getPayrollRun,
  createPayrollRun,
  updatePayrollRun,
  approvePayrollRun,
  lockPayrollRun,
} from "../controllers/hrController.js";
import { protect, requirePermission } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, requirePermission("hr.payroll.read"), listPayrollRuns);
router.get("/:id", protect, requirePermission("hr.payroll.read"), getPayrollRun);
router.post("/", protect, requirePermission("hr.payroll.write"), createPayrollRun);
router.patch("/:id", protect, requirePermission("hr.payroll.write"), updatePayrollRun);
router.post("/:id/approve", protect, requirePermission("hr.payroll.approve"), approvePayrollRun);
router.post("/:id/lock", protect, requirePermission("hr.payroll.approve"), lockPayrollRun);

export default router;
