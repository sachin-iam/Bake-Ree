import mongoose from "mongoose";

const vendorItemPriceSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    uom: { type: String, required: true },
    price: { type: Number, required: true },
    minQty: { type: Number },
    validFrom: { type: Date },
    validTo: { type: Date },
  },
  { timestamps: true }
);

const VendorItemPrice =
  mongoose.models.VendorItemPrice || mongoose.model("VendorItemPrice", vendorItemPriceSchema);

export default VendorItemPrice;
