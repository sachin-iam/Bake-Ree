import mongoose from "mongoose";

const wasteLogSchema = new mongoose.Schema(
  {
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        batchId: { type: mongoose.Schema.Types.ObjectId, ref: "StockBatch" },
        qty: { type: Number, required: true },
        cost: { type: Number },
      },
    ],
    reason: { type: String, required: true },
    photos: [{ type: String }],
  },
  { timestamps: true }
);

const WasteLog = mongoose.models.WasteLog || mongoose.model("WasteLog", wasteLogSchema);

export default WasteLog;
