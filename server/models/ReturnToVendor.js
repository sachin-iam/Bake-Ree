import mongoose from "mongoose";

const returnToVendorSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        batchId: { type: mongoose.Schema.Types.ObjectId, ref: "StockBatch" },
        qty: { type: Number, required: true },
      },
    ],
    linkedPoId: { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseOrder" },
    status: { type: String, enum: ["draft", "sent", "closed"], default: "draft" },
  },
  { timestamps: true }
);

const ReturnToVendor =
  mongoose.models.ReturnToVendor || mongoose.model("ReturnToVendor", returnToVendorSchema);

export default ReturnToVendor;
