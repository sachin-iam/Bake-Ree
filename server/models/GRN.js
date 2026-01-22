import mongoose from "mongoose";

const grnSchema = new mongoose.Schema(
  {
    poId: { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseOrder", required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
    receivedLines: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        batch: {
          lot: { type: String, required: true },
          mfg: { type: Date },
          exp: { type: Date },
        },
        qty: { type: Number, required: true },
        uom: { type: String, required: true },
        unitCost: { type: Number, required: true },
      },
    ],
    qcStatus: {
      type: String,
      enum: ["pending", "passed", "failed", "partial"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const GRN = mongoose.models.GRN || mongoose.model("GRN", grnSchema);

export default GRN;
