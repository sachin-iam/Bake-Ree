import mongoose from "mongoose";

const customerInsightSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", index: true },
    clv: { type: Number },
    churnScore: { type: Number },
    rfm: { type: Object },
    lifecycle: { type: String },
    affinity: [{ type: Object }],
    moodTags: [{ type: String }],
    recommendations: [{ type: Object }],
  },
  { timestamps: true }
);

const CustomerInsight =
  mongoose.models.CustomerInsight || mongoose.model("CustomerInsight", customerInsightSchema);

export default CustomerInsight;
