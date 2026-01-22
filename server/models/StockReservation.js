import mongoose from "mongoose";

const stockReservationSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true, index: true },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
      index: true,
    },
    orderId: { type: String },
    workOrderId: { type: String },
    qty: { type: Number, required: true },
    batchIdsAllocated: [
      {
        batchId: { type: mongoose.Schema.Types.ObjectId, ref: "StockBatch" },
        qty: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["reserved", "released", "consumed"],
      default: "reserved",
    },
  },
  { timestamps: true }
);

const StockReservation =
  mongoose.models.StockReservation || mongoose.model("StockReservation", stockReservationSchema);

export default StockReservation;
