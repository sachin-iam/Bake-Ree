import LoyaltyPoints from "../models/LoyaltyPoints.js";
import CustomerProfile from "../models/CustomerProfile.js";

// Configuration
const POINTS_PER_RUPEE = 1; // 1 point per ₹1 spent
const RUPEE_PER_POINT = 100; // 100 points = ₹1 (can be redeemed)

/**
 * Calculate points earned for an order amount
 * @param {Number} orderAmount - Order total amount
 * @param {String} membershipTier - Customer membership tier
 * @returns {Number} Points earned
 */
export const calculatePointsEarned = (orderAmount, membershipTier = "Bronze") => {
  let basePoints = Math.floor(orderAmount * POINTS_PER_RUPEE);
  
  // Tier-based bonus multipliers
  const tierMultipliers = {
    Bronze: 1.0,    // 1 point per ₹1
    Silver: 1.1,    // 1.1 points per ₹1 (10% bonus)
    Gold: 1.2,      // 1.2 points per ₹1 (20% bonus)
    Platinum: 1.5,  // 1.5 points per ₹1 (50% bonus)
  };
  
  const multiplier = tierMultipliers[membershipTier] || 1.0;
  return Math.floor(basePoints * multiplier);
};

/**
 * Award points for an order
 * @param {String} userId - User ID
 * @param {String} orderId - Order ID
 * @param {Number} orderAmount - Order total amount
 * @returns {Object} Points transaction record
 */
export const awardPointsForOrder = async (userId, orderId, orderAmount) => {
  try {
    // Get customer profile to determine tier
    const profile = await CustomerProfile.findOne({ user: userId });
    const membershipTier = profile?.membershipTier || "Bronze";
    
    // Calculate points earned
    const pointsEarned = calculatePointsEarned(orderAmount, membershipTier);
    
    if (pointsEarned <= 0) {
      return null; // No points for zero or negative amounts
    }
    
    // Get current balance
    const currentBalance = await getPointsBalance(userId);
    
    // Create points transaction
    const transaction = await LoyaltyPoints.create({
      user: userId,
      points: pointsEarned,
      balance: currentBalance + pointsEarned,
      transactionType: "earned",
      order: orderId,
      description: `Points earned for order #${orderId.toString().slice(-8).toUpperCase()}`,
    });
    
    // Update customer profile with new balance
    await CustomerProfile.findOneAndUpdate(
      { user: userId },
      { $inc: { loyaltyPointsBalance: pointsEarned } },
      { upsert: true }
    );
    
    console.log(`✅ Awarded ${pointsEarned} points to user ${userId} for order ${orderId}`);
    return transaction;
  } catch (error) {
    console.error("Error awarding points:", error);
    throw error;
  }
};

/**
 * Get current points balance for a user
 * @param {String} userId - User ID
 * @returns {Number} Current points balance
 */
export const getPointsBalance = async (userId) => {
  try {
    // Get the most recent transaction to get current balance
    const latestTransaction = await LoyaltyPoints.findOne({ user: userId })
      .sort({ createdAt: -1 });
    
    if (!latestTransaction) {
      return 0;
    }
    
    // Recalculate balance from all non-expired transactions
    const now = new Date();
    const transactions = await LoyaltyPoints.find({
      user: userId,
      $or: [
        { expiresAt: { $gt: now } },
        { expiresAt: { $exists: false } },
      ],
    });
    
    const balance = transactions.reduce((sum, txn) => {
      if (txn.transactionType === "earned" || txn.transactionType === "bonus") {
        return sum + txn.points;
      } else if (txn.transactionType === "redeemed" || txn.transactionType === "expired") {
        return sum - txn.points;
      }
      return sum;
    }, 0);
    
    return Math.max(0, balance); // Ensure balance is never negative
  } catch (error) {
    console.error("Error getting points balance:", error);
    return 0;
  }
};

/**
 * Redeem points
 * @param {String} userId - User ID
 * @param {Number} pointsToRedeem - Points to redeem
 * @param {String} description - Description of redemption
 * @returns {Object} Redemption transaction
 */
export const redeemPoints = async (userId, pointsToRedeem, description = "Points redeemed") => {
  try {
    const currentBalance = await getPointsBalance(userId);
    
    if (pointsToRedeem > currentBalance) {
      throw new Error("Insufficient points balance");
    }
    
    if (pointsToRedeem <= 0) {
      throw new Error("Points to redeem must be greater than 0");
    }
    
    // Create redemption transaction
    const transaction = await LoyaltyPoints.create({
      user: userId,
      points: pointsToRedeem,
      balance: currentBalance - pointsToRedeem,
      transactionType: "redeemed",
      description,
    });
    
    // Update customer profile
    await CustomerProfile.findOneAndUpdate(
      { user: userId },
      { $inc: { loyaltyPointsBalance: -pointsToRedeem } },
      { upsert: true }
    );
    
    console.log(`✅ Redeemed ${pointsToRedeem} points for user ${userId}`);
    return transaction;
  } catch (error) {
    console.error("Error redeeming points:", error);
    throw error;
  }
};

/**
 * Convert points to currency value
 * @param {Number} points - Points to convert
 * @returns {Number} Currency value in ₹
 */
export const pointsToCurrency = (points) => {
  return (points / RUPEE_PER_POINT).toFixed(2);
};

/**
 * Get points transaction history
 * @param {String} userId - User ID
 * @param {Number} limit - Number of transactions to return
 * @returns {Array} Transaction history
 */
export const getPointsHistory = async (userId, limit = 50) => {
  try {
    const transactions = await LoyaltyPoints.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("order", "totalAmount status");
    
    return transactions;
  } catch (error) {
    console.error("Error getting points history:", error);
    return [];
  }
};

/**
 * Award bonus points (for special promotions, referrals, etc.)
 * @param {String} userId - User ID
 * @param {Number} points - Points to award
 * @param {String} description - Description of bonus
 * @returns {Object} Bonus transaction
 */
export const awardBonusPoints = async (userId, points, description) => {
  try {
    const currentBalance = await getPointsBalance(userId);
    
    const transaction = await LoyaltyPoints.create({
      user: userId,
      points,
      balance: currentBalance + points,
      transactionType: "bonus",
      description,
    });
    
    await CustomerProfile.findOneAndUpdate(
      { user: userId },
      { $inc: { loyaltyPointsBalance: points } },
      { upsert: true }
    );
    
    return transaction;
  } catch (error) {
    console.error("Error awarding bonus points:", error);
    throw error;
  }
};

export default {
  calculatePointsEarned,
  awardPointsForOrder,
  getPointsBalance,
  redeemPoints,
  pointsToCurrency,
  getPointsHistory,
  awardBonusPoints,
};

