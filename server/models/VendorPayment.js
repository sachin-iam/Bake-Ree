import mongoose from "mongoose";

const vendorPaymentSchema = new mongoose.Schema(
  {
    billId: { type: mongoose.Schema.Types.ObjectId, ref: "VendorBill", required: true },
    method: { type: String, required: true },
    amount: { type: Number, required: true },
    paidAt: { type: Date },
    refNo: { type: String },
  },
  { timestamps: true }
);

const VendorPayment =
  mongoose.models.VendorPayment || mongoose.model("VendorPayment", vendorPaymentSchema);

export default VendorPayment;
