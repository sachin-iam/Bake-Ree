import CustomerInsight from "../models/CustomerInsight.js";
import RecommendationFeedback from "../models/RecommendationFeedback.js";

const buildRuleRecommendations = ({
  wishlistItems = [],
  frequentCategories = [],
  lastCelebrationAt,
  churnRisk,
  tierProgress,
}) => {
  const recommendations = [];

  if (wishlistItems.length > 0) {
    const topWish = wishlistItems[0];
    recommendations.push({
      productId: topWish.productId ?? "wishlist",
      reason: "Wishlist item + related category",
      confidence: 0.82,
    });
  }

  if (frequentCategories.includes("coffee")) {
    recommendations.push({
      productId: "pastry-pairing",
      reason: "Frequent coffee orders detected",
      confidence: 0.74,
    });
  }

  if (lastCelebrationAt) {
    recommendations.push({
      productId: "celebration-reminder",
      reason: "Celebration pattern detected 25-30 days ago",
      confidence: 0.68,
    });
  }

  if (churnRisk === "high") {
    recommendations.push({
      productId: "winback-offer",
      reason: "High churn risk",
      confidence: 0.77,
    });
  }

  if (tierProgress && tierProgress.remainingSpend) {
    recommendations.push({
      productId: "tier-upgrade",
      reason: `Spend ${tierProgress.remainingSpend} to reach ${tierProgress.nextTier}`,
      confidence: 0.7,
    });
  }

  return recommendations;
};

export const getRecommendations = async (customerId, context = {}) => {
  const ruleBased = buildRuleRecommendations(context);

  await CustomerInsight.findOneAndUpdate(
    { customerId },
    { recommendations: ruleBased },
    { upsert: true, new: true }
  );

  return ruleBased.map((item) => ({
    productId: item.productId,
    reason: item.reason,
    confidence: item.confidence,
  }));
};

export const recordRecommendationFeedback = async ({
  customerId,
  recommendationId,
  productId,
  feedback,
  reason,
}) => {
  return RecommendationFeedback.create({
    customerId,
    recommendationId,
    productId,
    feedback,
    reason,
  });
};
