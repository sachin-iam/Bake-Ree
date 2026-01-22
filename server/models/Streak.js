import mongoose from "mongoose";

const streakSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", index: true },
    currentStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
    lastOrderDate: { type: Date },
    milestones: [{ type: Object }],
  },
  { timestamps: true }
);

const Streak = mongoose.models.Streak || mongoose.model("Streak", streakSchema);

export default Streak;
