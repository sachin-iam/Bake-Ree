import mongoose from "mongoose";

const tierStatusSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", index: true },
    tier: { type: String, default: "Bronze" },
    pointsBalance: { type: Number, default: 0 },
    tierProgress: { type: Object },
    streakStatus: { type: Object },
  },
  { timestamps: true }
);

const TierStatus = mongoose.models.TierStatus || mongoose.model("TierStatus", tierStatusSchema);

export default TierStatus;
