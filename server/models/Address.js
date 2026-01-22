import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", index: true },
    label: { type: String },
    line1: { type: String },
    areaId: { type: mongoose.Schema.Types.ObjectId, ref: "Area" },
    zoneId: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);

export default Address;
