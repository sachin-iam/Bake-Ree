import Item from "../models/Item.js";
import Warehouse from "../models/Warehouse.js";
import Bin from "../models/Bin.js";
import StockBatch from "../models/StockBatch.js";
import StockReservation from "../models/StockReservation.js";
import StockLedgerEntry from "../models/StockLedgerEntry.js";
import Adjustment from "../models/Adjustment.js";
import Transfer from "../models/Transfer.js";
import WasteLog from "../models/WasteLog.js";
import ReturnToVendor from "../models/ReturnToVendor.js";
import ProductionConsumption from "../models/ProductionConsumption.js";
import {
  allocateFefoBatches,
  recordStockMovement,
  releaseBatchReservations,
  reserveBatches,
} from "../services/inventoryLedgerService.js";
import { emitWasteRecorded } from "../services/inventoryEventService.js";

export const listItems = async (_req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
};

export const createItem = async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).json(item);
};

export const listWarehouses = async (_req, res) => {
  const warehouses = await Warehouse.find().sort({ createdAt: -1 });
  res.json(warehouses);
};

export const createWarehouse = async (req, res) => {
  const warehouse = await Warehouse.create(req.body);
  res.status(201).json(warehouse);
};

export const listBins = async (req, res) => {
  const { warehouseId } = req.query;
  const query = {};
  if (warehouseId) query.warehouseId = warehouseId;
  const bins = await Bin.find(query).sort({ createdAt: -1 });
  res.json(bins);
};

export const createBin = async (req, res) => {
  const bin = await Bin.create(req.body);
  res.status(201).json(bin);
};

export const listBatches = async (req, res) => {
  const { itemId, warehouseId } = req.query;
  const query = {};
  if (itemId) query.itemId = itemId;
  if (warehouseId) query.warehouseId = warehouseId;
  const batches = await StockBatch.find(query).sort({ expDate: 1, createdAt: -1 });
  res.json(batches);
};

export const listLedger = async (req, res) => {
  const { itemId, warehouseId, type, refId, from, to } = req.query;
  const query = {};
  if (itemId) query.itemId = itemId;
  if (warehouseId) query.warehouseId = warehouseId;
  if (type) query.type = type;
  if (refId) query.refId = refId;
  if (from || to) {
    query.ts = {};
    if (from) query.ts.$gte = new Date(from);
    if (to) query.ts.$lte = new Date(to);
  }
  const entries = await StockLedgerEntry.find(query).sort({ ts: -1 });
  res.json(entries);
};

export const createReservation = async (req, res) => {
  const { itemId, warehouseId, qty, orderId, workOrderId } = req.body;
  const { allocations, remaining } = await allocateFefoBatches({ itemId, warehouseId, qty });

  if (remaining > 0) {
    return res.status(409).json({ message: "Insufficient stock to reserve", remaining });
  }

  await reserveBatches({ allocations });

  const reservation = await StockReservation.create({
    itemId,
    warehouseId,
    qty,
    orderId,
    workOrderId,
    batchIdsAllocated: allocations,
    status: "reserved",
  });

  res.status(201).json(reservation);
};

export const consumeReservation = async (req, res) => {
  const { reservationId } = req.params;
  const reservation = await StockReservation.findById(reservationId);
  if (!reservation) return res.status(404).json({ message: "Reservation not found" });
  if (reservation.status !== "reserved") {
    return res.status(400).json({ message: "Reservation is not active" });
  }

  await releaseBatchReservations({ allocations: reservation.batchIdsAllocated });

  for (const allocation of reservation.batchIdsAllocated) {
    const batch = await StockBatch.findById(allocation.batchId);
    await recordStockMovement({
      itemId: reservation.itemId,
      warehouseId: reservation.warehouseId,
      batchId: allocation.batchId,
      type: reservation.workOrderId ? "ISSUE" : "OUT",
      qty: allocation.qty,
      uom: "unit",
      unitCost: batch?.unitCost ?? 0,
      refType: reservation.workOrderId ? "WORK_ORDER" : "ORDER",
      refId: reservation.workOrderId ?? reservation.orderId,
      direction: "out",
    });
  }

  reservation.status = "consumed";
  await reservation.save();
  res.json(reservation);
};

export const releaseReservation = async (req, res) => {
  const { reservationId } = req.params;
  const reservation = await StockReservation.findById(reservationId);
  if (!reservation) return res.status(404).json({ message: "Reservation not found" });
  if (reservation.status !== "reserved") {
    return res.status(400).json({ message: "Reservation is not active" });
  }

  await releaseBatchReservations({ allocations: reservation.batchIdsAllocated });
  reservation.status = "released";
  await reservation.save();
  res.json(reservation);
};

export const createAdjustment = async (req, res) => {
  const adjustment = await Adjustment.create(req.body);
  for (const line of adjustment.items) {
    const batch = line.batchId ? await StockBatch.findById(line.batchId) : null;
    const direction = line.qtyDelta < 0 ? "out" : "in";
    await recordStockMovement({
      itemId: line.itemId,
      warehouseId: adjustment.warehouseId,
      batchId: line.batchId,
      type: "ADJUST",
      qty: Math.abs(line.qtyDelta),
      uom: "unit",
      unitCost: batch?.unitCost ?? 0,
      refType: "ADJUSTMENT",
      refId: adjustment._id.toString(),
      createdBy: adjustment.createdBy,
      reasonCode: line.reason,
      direction,
    });
  }
  res.status(201).json(adjustment);
};

export const createTransfer = async (req, res) => {
  const transfer = await Transfer.create({ ...req.body, status: "in_transit" });
  for (const line of transfer.items) {
    const batch = line.batchId ? await StockBatch.findById(line.batchId) : null;
    await recordStockMovement({
      itemId: line.itemId,
      warehouseId: transfer.fromWarehouseId,
      batchId: line.batchId,
      type: "TRANSFER_OUT",
      qty: line.qty,
      uom: "unit",
      unitCost: batch?.unitCost ?? 0,
      refType: "TRANSFER",
      refId: transfer._id.toString(),
      direction: "out",
    });
  }
  res.status(201).json(transfer);
};

export const receiveTransfer = async (req, res) => {
  const transfer = await Transfer.findById(req.params.transferId);
  if (!transfer) return res.status(404).json({ message: "Transfer not found" });

  for (const line of transfer.items) {
    const sourceBatch = line.batchId ? await StockBatch.findById(line.batchId) : null;
    let destBatch = await StockBatch.findOne({
      itemId: line.itemId,
      warehouseId: transfer.toWarehouseId,
      lotNumber: sourceBatch?.lotNumber,
    });
    if (!destBatch) {
      destBatch = await StockBatch.create({
        itemId: line.itemId,
        warehouseId: transfer.toWarehouseId,
        lotNumber: sourceBatch?.lotNumber ?? `TR-${transfer._id}`,
        mfgDate: sourceBatch?.mfgDate,
        expDate: sourceBatch?.expDate,
        qtyOnHand: 0,
        qtyReserved: 0,
        unitCost: sourceBatch?.unitCost ?? 0,
        sourceRef: transfer._id.toString(),
      });
    }

    await recordStockMovement({
      itemId: line.itemId,
      warehouseId: transfer.toWarehouseId,
      batchId: destBatch._id,
      type: "TRANSFER_IN",
      qty: line.qty,
      uom: "unit",
      unitCost: destBatch.unitCost,
      refType: "TRANSFER",
      refId: transfer._id.toString(),
      direction: "in",
    });
  }

  transfer.status = "received";
  await transfer.save();
  res.json(transfer);
};

export const logWaste = async (req, res) => {
  const wasteLog = await WasteLog.create(req.body);
  for (const line of wasteLog.items) {
    const batch = line.batchId ? await StockBatch.findById(line.batchId) : null;
    await recordStockMovement({
      itemId: line.itemId,
      warehouseId: wasteLog.warehouseId,
      batchId: line.batchId,
      type: "WASTE",
      qty: line.qty,
      uom: "unit",
      unitCost: batch?.unitCost ?? 0,
      refType: "ADJUSTMENT",
      refId: wasteLog._id.toString(),
      reasonCode: wasteLog.reason,
      direction: "out",
    });
  }
  emitWasteRecorded({ id: wasteLog._id, warehouseId: wasteLog.warehouseId });
  res.status(201).json(wasteLog);
};

export const createReturn = async (req, res) => {
  const returnDoc = await ReturnToVendor.create(req.body);
  for (const line of returnDoc.items) {
    const batch = line.batchId ? await StockBatch.findById(line.batchId) : null;
    await recordStockMovement({
      itemId: line.itemId,
      warehouseId: returnDoc.warehouseId,
      batchId: line.batchId,
      type: "RETURN",
      qty: line.qty,
      uom: "unit",
      unitCost: batch?.unitCost ?? 0,
      refType: "RTV",
      refId: returnDoc._id.toString(),
      direction: "out",
    });
  }
  res.status(201).json(returnDoc);
};

export const createProductionConsumption = async (req, res) => {
  const production = await ProductionConsumption.create(req.body);

  for (const input of production.inputs) {
    const batchId = input.batchIds?.[0];
    const batch = batchId ? await StockBatch.findById(batchId) : null;
    await recordStockMovement({
      itemId: input.itemId,
      warehouseId: production.warehouseId,
      batchId,
      type: "ISSUE",
      qty: input.qty,
      uom: "unit",
      unitCost: batch?.unitCost ?? 0,
      refType: "PRODUCTION",
      refId: production.workOrderId,
      direction: "out",
    });
  }

  for (const output of production.outputs) {
    const batch = await StockBatch.create({
      itemId: output.itemId,
      warehouseId: production.warehouseId,
      lotNumber: output.batch.lotNumber,
      mfgDate: output.batch.mfgDate,
      expDate: output.batch.expDate,
      qtyOnHand: 0,
      qtyReserved: 0,
      unitCost: 0,
      sourceRef: production.workOrderId,
    });

    await recordStockMovement({
      itemId: output.itemId,
      warehouseId: production.warehouseId,
      batchId: batch._id,
      type: "PROD_OUT",
      qty: output.qty,
      uom: "unit",
      unitCost: batch.unitCost,
      refType: "PRODUCTION",
      refId: production.workOrderId,
      direction: "in",
    });
  }

  res.status(201).json(production);
};
