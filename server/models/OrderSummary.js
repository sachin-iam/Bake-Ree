import mongoose from "mongoose";

const orderSummarySchema = new mongoose.Schema(
  {
    orderId: { type: String, index: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", index: true },
    total: { type: Number },
    items: [{ productId: String, name: String, qty: Number }],
    createdAt: { type: Date },
    channel: { type: String },
    type: { type: String },
    status: { type: String },
    discount: { type: Number },
    taxes: { type: Number },
  },
  { timestamps: true }
);

const OrderSummary =
  mongoose.models.OrderSummary || mongoose.model("OrderSummary", orderSummarySchema);

export default OrderSummary;
