import mongoose from "mongoose";

const transferSchema = new mongoose.Schema(
  {
    fromWarehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
    toWarehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        batchId: { type: mongoose.Schema.Types.ObjectId, ref: "StockBatch" },
        qty: { type: Number, required: true },
      },
    ],
    status: { type: String, enum: ["draft", "in_transit", "received"], default: "draft" },
  },
  { timestamps: true }
);

const Transfer = mongoose.models.Transfer || mongoose.model("Transfer", transferSchema);

export default Transfer;
