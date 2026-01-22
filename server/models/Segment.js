import mongoose from "mongoose";

const segmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rules: { type: Object },
    cachedCount: { type: Number },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

const Segment = mongoose.models.Segment || mongoose.model("Segment", segmentSchema);

export default Segment;
