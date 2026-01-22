import mongoose from "mongoose";

const purchaseRequestSchema = new mongoose.Schema(
  {
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        qty: { type: Number, required: true },
        uom: { type: String, required: true },
        reason: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const PurchaseRequest =
  mongoose.models.PurchaseRequest || mongoose.model("PurchaseRequest", purchaseRequestSchema);

export default PurchaseRequest;
