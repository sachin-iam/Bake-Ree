import mongoose from "mongoose";

const recommendationFeedbackSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", index: true },
    recommendationId: { type: String },
    productId: { type: String },
    feedback: { type: String, enum: ["accept", "reject"] },
    reason: { type: String },
  },
  { timestamps: true, collection: "recommendation_feedback" }
);

const RecommendationFeedback =
  mongoose.models.RecommendationFeedback ||
  mongoose.model("RecommendationFeedback", recommendationFeedbackSchema);

export default RecommendationFeedback;
