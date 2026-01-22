import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    segmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Segment" },
    channel: { type: String },
    schedule: { type: Object },
    content: { type: Object },
    stats: { type: Object },
  },
  { timestamps: true }
);

const Campaign = mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);

export default Campaign;
