import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",          // ⬅️ final: product
          required: true,
        },
        quantity: { type: Number, required: true },
        price:    { type: Number, required: true },
      },
    ],
    simplifiedItems: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"],
      default: "Pending",
      required: true,
    },
    orderType: {
      type: String,
      enum: ["Delivery", "Pickup"],
      default: "Pickup",
      required: true,
    },
    deliveryCharge: { type: Number, default: 0 },
    specialInstructions: { type: String },
    // Delivery address fields
    deliveryAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String, default: "India" },
      landmark: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
      recipientName: { type: String },
      phone: { type: String },
    },
    deliveryAddressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryAddress",
      default: null,
    },
    estimatedDeliveryTime: {
      type: Date,
      default: null,
    },
    assignedKitchenStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
