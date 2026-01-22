import express from "express";
import {
  listEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
} from "../controllers/hrController.js";
import { protect, adminOnly, requirePermission } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, requirePermission("hr.employees.read"), listEmployees);
router.get("/:id", protect, requirePermission("hr.employees.read"), getEmployee);
router.post("/", protect, adminOnly, requirePermission("hr.employees.write"), createEmployee);
router.patch("/:id", protect, adminOnly, requirePermission("hr.employees.write"), updateEmployee);

export default router;
