import express from "express";
import {
  createBill,
  createGRN,
  createPayment,
  createPO,
  createRequest,
  createVendor,
  createVendorItem,
  createReturn,
  listBills,
  listGRNs,
  listPOs,
  listPayments,
  listRequests,
  listVendorItems,
  listVendors,
  listReturns,
} from "../controllers/procurementController.js";

const router = express.Router();

router.get("/vendors", listVendors);
router.post("/vendors", createVendor);

router.get("/items", listVendorItems);
router.post("/items", createVendorItem);

router.get("/requests", listRequests);
router.post("/requests", createRequest);

router.get("/pos", listPOs);
router.post("/pos", createPO);

router.get("/grn", listGRNs);
router.post("/grn", createGRN);

router.get("/bills", listBills);
router.post("/bills", createBill);

router.get("/payments", listPayments);
router.post("/payments", createPayment);

router.get("/returns", listReturns);
router.post("/returns", createReturn);

export default router;
