import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contacts: [
      {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
      },
    ],
    leadTimeDays: { type: Number },
    paymentTerms: { type: String },
    rating: { type: Number },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);

export default Vendor;
