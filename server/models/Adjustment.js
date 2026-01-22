import mongoose from "mongoose";

const adjustmentSchema = new mongoose.Schema(
  {
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        batchId: { type: mongoose.Schema.Types.ObjectId, ref: "StockBatch" },
        qtyDelta: { type: Number, required: true },
        reason: { type: String, required: true },
      },
    ],
    approvedBy: { type: String },
    createdBy: { type: String },
  },
  { timestamps: true }
);

const Adjustment = mongoose.models.Adjustment || mongoose.model("Adjustment", adjustmentSchema);

export default Adjustment;
