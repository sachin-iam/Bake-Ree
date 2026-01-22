import mongoose from "mongoose";

const stockLedgerSchema = new mongoose.Schema(
  {
    ts: { type: Date, default: Date.now },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true, index: true },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
      index: true,
    },
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: "StockBatch" },
    type: {
      type: String,
      enum: [
        "IN",
        "OUT",
        "TRANSFER_IN",
        "TRANSFER_OUT",
        "ADJUST",
        "WASTE",
        "RETURN",
        "ISSUE",
        "PROD_OUT",
      ],
      required: true,
    },
    qty: { type: Number, required: true },
    uom: { type: String, required: true },
    unitCost: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    refType: {
      type: String,
      enum: [
        "GRN",
        "PO",
        "ORDER",
        "WORK_ORDER",
        "ADJUSTMENT",
        "TRANSFER",
        "RTV",
        "PRODUCTION",
      ],
    },
    refId: { type: String },
    createdBy: { type: String },
    note: { type: String },
    beforeQty: { type: Number },
    afterQty: { type: Number },
    reasonCode: { type: String },
  },
  { timestamps: true }
);

const StockLedgerEntry =
  mongoose.models.StockLedgerEntry || mongoose.model("StockLedgerEntry", stockLedgerSchema);

export default StockLedgerEntry;
