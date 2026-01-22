import mongoose from "mongoose";

const stockBatchSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true, index: true },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
      index: true,
    },
    binId: { type: mongoose.Schema.Types.ObjectId, ref: "Bin" },
    lotNumber: { type: String, required: true, index: true },
    mfgDate: { type: Date },
    expDate: { type: Date, index: true },
    qtyOnHand: { type: Number, default: 0 },
    qtyReserved: { type: Number, default: 0 },
    unitCost: { type: Number, default: 0 },
    sourceRef: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

stockBatchSchema.virtual("qtyAvailable").get(function qtyAvailable() {
  return Math.max(this.qtyOnHand - this.qtyReserved, 0);
});

const StockBatch =
  mongoose.models.StockBatch || mongoose.model("StockBatch", stockBatchSchema);

export default StockBatch;
