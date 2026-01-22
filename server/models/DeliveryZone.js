import mongoose from "mongoose";

const deliveryZoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    deliveryCharge: {
      type: Number,
      required: true,
      default: 0,
    },
    minimumOrderAmount: {
      type: Number,
      default: 0, // Free delivery above this amount
    },
    estimatedDeliveryTime: {
      type: Number, // in minutes
      default: 45,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    boundaries: {
      // Polygon coordinates for zone boundaries
      type: [
        {
          lat: { type: Number, required: true },
          lng: { type: Number, required: true },
        },
      ],
      default: [],
    },
    center: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    radius: {
      type: Number, // in kilometers
      default: 5,
    },
  },
  { timestamps: true }
);

// Indexes
deliveryZoneSchema.index({ name: 1 });
deliveryZoneSchema.index({ isActive: 1 });

const DeliveryZone = mongoose.model("DeliveryZone", deliveryZoneSchema);
export default DeliveryZone;

