import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["central", "store", "kitchen"], required: true },
    address: { type: String },
    zones: [{ type: String }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Warehouse = mongoose.models.Warehouse || mongoose.model("Warehouse", warehouseSchema);

export default Warehouse;
