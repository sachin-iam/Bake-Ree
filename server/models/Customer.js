// models/Customer.js
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Avoid model overwrite error in dev with hot reload
const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
