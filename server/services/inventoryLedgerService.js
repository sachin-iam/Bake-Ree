import StockBatch from "../models/StockBatch.js";
import StockLedgerEntry from "../models/StockLedgerEntry.js";
import Item from "../models/Item.js";
import { emitBatchExpiring, emitLowStock } from "./inventoryEventService.js";

const OUT_TYPES = new Set(["OUT", "TRANSFER_OUT", "WASTE", "RETURN", "ISSUE"]);
const IN_TYPES = new Set(["IN", "TRANSFER_IN", "PROD_OUT"]);

export const recordStockMovement = async ({
  itemId,
  warehouseId,
  batchId,
  type,
  qty,
  uom,
  unitCost,
  refType,
  refId,
  createdBy,
  note,
  reasonCode,
  direction,
}) => {
  const batch = batchId ? await StockBatch.findById(batchId) : null;
  const beforeQty = batch?.qtyOnHand ?? 0;
  const resolvedCost = unitCost ?? batch?.unitCost ?? 0;
  const resolvedDirection =
    direction ?? (OUT_TYPES.has(type) ? "out" : IN_TYPES.has(type) ? "in" : "in");
  const delta = resolvedDirection === "out" ? -Math.abs(qty) : Math.abs(qty);
  const afterQty = beforeQty + delta;

  if (batch) {
    batch.qtyOnHand = afterQty;
    batch.qtyReserved = Math.min(batch.qtyReserved, Math.max(afterQty, 0));
    await batch.save();
  }

  const entry = await StockLedgerEntry.create({
    itemId,
    warehouseId,
    batchId,
    type,
    qty: Math.abs(qty),
    uom,
    unitCost: resolvedCost,
    totalCost: Math.abs(qty) * resolvedCost,
    refType,
    refId,
    createdBy,
    note,
    beforeQty,
    afterQty,
    reasonCode,
  });

  if (batch?.expDate) {
    const daysToExpire = (batch.expDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    if (daysToExpire <= 7) {
      emitBatchExpiring({ itemId, warehouseId, batchId, expDate: batch.expDate });
    }
  }

  const item = await Item.findById(itemId);
  if (item?.reorderPoint && batch) {
    const available = Math.max(batch.qtyOnHand - batch.qtyReserved, 0);
    if (available <= item.reorderPoint) {
      emitLowStock({ itemId, warehouseId, available, reorderPoint: item.reorderPoint });
    }
  }

  return entry;
};

export const allocateFefoBatches = async ({ itemId, warehouseId, qty }) => {
  const batches = await StockBatch.find({ itemId, warehouseId });
  const farFuture = new Date("2999-12-31").getTime();
  batches.sort((a, b) => {
    const aExp = a.expDate ? a.expDate.getTime() : farFuture;
    const bExp = b.expDate ? b.expDate.getTime() : farFuture;
    if (aExp !== bExp) return aExp - bExp;
    const aMfg = a.mfgDate ? a.mfgDate.getTime() : 0;
    const bMfg = b.mfgDate ? b.mfgDate.getTime() : 0;
    return aMfg - bMfg;
  });

  let remaining = qty;
  const allocations = [];

  for (const batch of batches) {
    const available = Math.max(batch.qtyOnHand - batch.qtyReserved, 0);
    if (available <= 0) continue;
    const allocateQty = Math.min(available, remaining);
    allocations.push({ batchId: batch._id, qty: allocateQty });
    remaining -= allocateQty;
    if (remaining <= 0) break;
  }

  return { allocations, remaining };
};

export const reserveBatches = async ({ allocations }) => {
  for (const allocation of allocations) {
    const batch = await StockBatch.findById(allocation.batchId);
    if (!batch) continue;
    batch.qtyReserved += allocation.qty;
    await batch.save();
  }
};

export const releaseBatchReservations = async ({ allocations }) => {
  for (const allocation of allocations) {
    const batch = await StockBatch.findById(allocation.batchId);
    if (!batch) continue;
    batch.qtyReserved = Math.max(batch.qtyReserved - allocation.qty, 0);
    await batch.save();
  }
};
