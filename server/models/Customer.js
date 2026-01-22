// models/Customer.js
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    status: { type: String, default: "active" },
    tags: [{ type: String }],
    areaId: { type: mongoose.Schema.Types.ObjectId, ref: "Area" },
    defaultAddressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    preferences: { type: Object },
    dietary: [{ type: String }],
    allergens: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Avoid model overwrite error in dev with hot reload
const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
