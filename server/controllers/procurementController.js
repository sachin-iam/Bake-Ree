import Vendor from "../models/Vendor.js";
import VendorItemPrice from "../models/VendorItemPrice.js";
import PurchaseRequest from "../models/PurchaseRequest.js";
import PurchaseOrder from "../models/PurchaseOrder.js";
import GRN from "../models/GRN.js";
import VendorBill from "../models/VendorBill.js";
import VendorPayment from "../models/VendorPayment.js";
import StockBatch from "../models/StockBatch.js";
import ReturnToVendor from "../models/ReturnToVendor.js";
import { recordStockMovement } from "../services/inventoryLedgerService.js";
import { emitGrnPosted } from "../services/inventoryEventService.js";
import { postAPBill } from "../services/financeHooks.js";

export const listVendors = async (_req, res) => {
  const vendors = await Vendor.find().sort({ createdAt: -1 });
  res.json(vendors);
};

export const createVendor = async (req, res) => {
  const vendor = await Vendor.create(req.body);
  res.status(201).json(vendor);
};

export const listVendorItems = async (_req, res) => {
  const items = await VendorItemPrice.find().sort({ createdAt: -1 });
  res.json(items);
};

export const createVendorItem = async (req, res) => {
  const item = await VendorItemPrice.create(req.body);
  res.status(201).json(item);
};

export const listRequests = async (_req, res) => {
  const requests = await PurchaseRequest.find().sort({ createdAt: -1 });
  res.json(requests);
};

export const createRequest = async (req, res) => {
  const request = await PurchaseRequest.create(req.body);
  res.status(201).json(request);
};

export const listPOs = async (_req, res) => {
  const orders = await PurchaseOrder.find().sort({ createdAt: -1 });
  res.json(orders);
};

export const createPO = async (req, res) => {
  const order = await PurchaseOrder.create(req.body);
  res.status(201).json(order);
};

export const listGRNs = async (_req, res) => {
  const grns = await GRN.find().sort({ createdAt: -1 });
  res.json(grns);
};

export const createGRN = async (req, res) => {
  const grn = await GRN.create(req.body);

  for (const line of grn.receivedLines) {
    const batch = await StockBatch.create({
      itemId: line.itemId,
      warehouseId: grn.warehouseId,
      lotNumber: line.batch.lot,
      mfgDate: line.batch.mfg,
      expDate: line.batch.exp,
      qtyOnHand: 0,
      qtyReserved: 0,
      unitCost: line.unitCost,
      sourceRef: grn._id.toString(),
    });

    await recordStockMovement({
      itemId: line.itemId,
      warehouseId: grn.warehouseId,
      batchId: batch._id,
      type: "IN",
      qty: line.qty,
      uom: line.uom,
      unitCost: line.unitCost,
      refType: "GRN",
      refId: grn._id.toString(),
      direction: "in",
    });
  }

  emitGrnPosted({ id: grn._id, vendorId: grn.vendorId });
  res.status(201).json(grn);
};

export const listBills = async (_req, res) => {
  const bills = await VendorBill.find().sort({ createdAt: -1 });
  res.json(bills);
};

export const createBill = async (req, res) => {
  const bill = await VendorBill.create(req.body);
  await postAPBill(bill._id.toString());
  res.status(201).json(bill);
};

export const listPayments = async (_req, res) => {
  const payments = await VendorPayment.find().sort({ createdAt: -1 });
  res.json(payments);
};

export const createPayment = async (req, res) => {
  const payment = await VendorPayment.create(req.body);
  res.status(201).json(payment);
};

export const listReturns = async (_req, res) => {
  const returns = await ReturnToVendor.find().sort({ createdAt: -1 });
  res.json(returns);
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
