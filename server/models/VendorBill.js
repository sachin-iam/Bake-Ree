import mongoose from "mongoose";

const vendorBillSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    poId: { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseOrder" },
    grnId: { type: mongoose.Schema.Types.ObjectId, ref: "GRN" },
    amount: { type: Number, required: true },
    tax: { type: Number },
    status: { type: String, enum: ["pending", "approved", "paid"], default: "pending" },
  },
  { timestamps: true }
);

const VendorBill =
  mongoose.models.VendorBill || mongoose.model("VendorBill", vendorBillSchema);

export default VendorBill;
