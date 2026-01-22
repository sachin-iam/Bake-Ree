import express from "express";
import {
  createAdjustment,
  createItem,
  createReservation,
  createReturn,
  createTransfer,
  createWarehouse,
  createBin,
  createProductionConsumption,
  listBins,
  listBatches,
  listItems,
  listLedger,
  listWarehouses,
  logWaste,
  consumeReservation,
  receiveTransfer,
  releaseReservation,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/items", listItems);
router.post("/items", createItem);

router.get("/warehouses", listWarehouses);
router.post("/warehouses", createWarehouse);
router.get("/bins", listBins);
router.post("/bins", createBin);

router.get("/batches", listBatches);
router.get("/ledger", listLedger);

router.post("/reservations", createReservation);
router.post("/reservations/:reservationId/consume", consumeReservation);
router.post("/reservations/:reservationId/release", releaseReservation);

router.post("/adjustments", createAdjustment);
router.post("/transfers", createTransfer);
router.post("/transfers/:transferId/receive", receiveTransfer);

router.post("/waste", logWaste);
router.post("/returns", createReturn);
router.post("/production", createProductionConsumption);

export default router;
