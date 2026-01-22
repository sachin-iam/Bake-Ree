import express from "express";
import { listPayslips, getPayslip, createPayslip, updatePayslip } from "../controllers/hrController.js";
import { protect, requirePermission } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, requirePermission("hr.payslips.read"), listPayslips);
router.get("/:id", protect, requirePermission("hr.payslips.read"), getPayslip);
router.post("/", protect, requirePermission("hr.payslips.write"), createPayslip);
router.patch("/:id", protect, requirePermission("hr.payslips.write"), updatePayslip);

export default router;
