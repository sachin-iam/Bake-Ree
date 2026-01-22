import express from "express";
import { listRoles, getRole, createRole, updateRole } from "../controllers/hrController.js";
import { protect, adminOnly, requirePermission } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, requirePermission("hr.roles.read"), listRoles);
router.get("/:id", protect, requirePermission("hr.roles.read"), getRole);
router.post("/", protect, adminOnly, requirePermission("hr.roles.write"), createRole);
router.patch("/:id", protect, adminOnly, requirePermission("hr.roles.write"), updateRole);

export default router;
