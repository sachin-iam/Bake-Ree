import mongoose from "mongoose";

const purchaseOrderSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
    lines: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        qty: { type: Number, required: true },
        uom: { type: String, required: true },
        price: { type: Number, required: true },
        tax: { type: Number },
        expectedDate: { type: Date },
      },
    ],
    status: {
      type: String,
      enum: ["draft", "approved", "sent", "partial", "closed", "cancelled"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const PurchaseOrder =
  mongoose.models.PurchaseOrder || mongoose.model("PurchaseOrder", purchaseOrderSchema);

export default PurchaseOrder;
