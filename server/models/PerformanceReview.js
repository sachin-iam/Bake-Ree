import mongoose from "mongoose";

const performanceReviewSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    cycle: String,
    rating: { type: Number, default: 0 },
    notes: String,
    status: { type: String, enum: ["DRAFT", "SUBMITTED", "COMPLETED"], default: "DRAFT" },
    kpis: [{ label: String, score: Number }],
  },
  { timestamps: true }
);

const PerformanceReview = mongoose.model("PerformanceReview", performanceReviewSchema);
export default PerformanceReview;
