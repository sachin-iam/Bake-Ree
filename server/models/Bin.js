import mongoose from "mongoose";

const binSchema = new mongoose.Schema(
  {
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
    code: { type: String, required: true },
    tempZone: { type: String },
  },
  { timestamps: true }
);

const Bin = mongoose.models.Bin || mongoose.model("Bin", binSchema);

export default Bin;
