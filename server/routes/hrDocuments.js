import express from "express";
import { listDocuments, getDocument, createDocument, updateDocument } from "../controllers/hrController.js";
import { protect, requirePermission } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, requirePermission("hr.documents.read"), listDocuments);
router.get("/:id", protect, requirePermission("hr.documents.read"), getDocument);
router.post("/", protect, requirePermission("hr.documents.write"), createDocument);
router.patch("/:id", protect, requirePermission("hr.documents.write"), updateDocument);

export default router;
