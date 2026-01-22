import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true, // One delivery per order
    },
    deliveryStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // Assigned delivery person
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "Picked Up",
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Failed",
        "Cancelled",
      ],
      default: "Pending",
      required: true,
    },
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, default: "India" },
      landmark: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    deliveryZone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryZone",
      default: null,
    },
    estimatedDeliveryTime: {
      type: Date,
      default: null,
    },
    actualDeliveryTime: {
      type: Date,
      default: null,
    },
    deliveryNotes: {
      type: String,
      default: "",
    },
    contactPhone: {
      type: String,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true,
      default: 0,
    },
    distance: {
      type: Number, // in kilometers
      default: 0,
    },
    trackingNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    // Real-time location tracking
    currentLocation: {
      lat: { type: Number },
      lng: { type: Number },
      updatedAt: { type: Date },
    },
    // Location history for route visualization
    locationHistory: [
      {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    // Estimated time remaining (in minutes)
    estimatedTimeRemaining: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

// Generate tracking number before save
deliverySchema.pre("save", async function (next) {
  if (!this.trackingNumber) {
    const count = await mongoose.model("Delivery").countDocuments();
    this.trackingNumber = `DLV${Date.now().toString().slice(-8)}${(count + 1)
      .toString()
      .padStart(4, "0")}`;
  }
  next();
});

// Index for efficient queries
deliverySchema.index({ order: 1 });
deliverySchema.index({ deliveryStaff: 1 });
deliverySchema.index({ status: 1 });
deliverySchema.index({ deliveryZone: 1 });
deliverySchema.index({ createdAt: -1 });

const Delivery = mongoose.model("Delivery", deliverySchema);
export default Delivery;

