import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["ingredient", "packaging", "finished_good"],
      required: true,
    },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    uomBase: { type: String, required: true },
    uomConversions: [
      {
        from: { type: String },
        to: { type: String },
        factor: { type: Number },
      },
    ],
    reorderPoint: { type: Number },
    reorderQty: { type: Number },
    minStock: { type: Number },
    maxStock: { type: Number },
    shelfLifeDays: { type: Number },
    storageTempZone: { type: String },
    allergens: [{ type: String }],
    taxCode: { type: String },
    costingMethod: { type: String, enum: ["FIFO", "WAVG"], default: "WAVG" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default Item;
