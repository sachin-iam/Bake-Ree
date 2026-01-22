import mongoose from "mongoose";

const productionConsumptionSchema = new mongoose.Schema(
  {
    workOrderId: { type: String, required: true },
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
    inputs: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        batchIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "StockBatch" }],
        qty: { type: Number, required: true },
      },
    ],
    outputs: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        batch: {
          lotNumber: { type: String, required: true },
          mfgDate: { type: Date },
          expDate: { type: Date },
        },
        qty: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const ProductionConsumption =
  mongoose.models.ProductionConsumption ||
  mongoose.model("ProductionConsumption", productionConsumptionSchema);

export default ProductionConsumption;
