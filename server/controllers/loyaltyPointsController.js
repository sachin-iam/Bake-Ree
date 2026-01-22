import {
  getPointsBalance,
  getPointsHistory,
  redeemPoints,
  pointsToCurrency,
  awardBonusPoints,
} from "../services/loyaltyPointsService.js";

/**
 * Get current points balance for logged-in user
 * GET /api/loyalty-points/balance
 */
export const getMyPointsBalance = async (req, res) => {
  try {
    const userId = req.user._id;
    const balance = await getPointsBalance(userId);
    const currencyValue = parseFloat(pointsToCurrency(balance));
    
    res.status(200).json({
      balance,
      currencyValue,
      pointsPerRupee: 1,
      rupeePerPoint: 100,
    });
  } catch (error) {
    console.error("Error getting points balance:", error);
    res.status(500).json({ error: "Failed to get points balance" });
  }
};

/**
 * Get points transaction history
 * GET /api/loyalty-points/history
 */
export const getMyPointsHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const limit = parseInt(req.query.limit) || 50;
    const history = await getPointsHistory(userId, limit);
    
    res.status(200).json(history);
  } catch (error) {
    console.error("Error getting points history:", error);
    res.status(500).json({ error: "Failed to get points history" });
  }
};

/**
 * Redeem points
 * POST /api/loyalty-points/redeem
 */
export const redeemMyPoints = async (req, res) => {
  try {
    const userId = req.user._id;
    const { points, description } = req.body;
    
    if (!points || points <= 0) {
      return res.status(400).json({ error: "Points must be greater than 0" });
    }
    
    const transaction = await redeemPoints(
      userId,
      points,
      description || "Points redeemed"
    );
    
    const newBalance = await getPointsBalance(userId);
    const currencyValue = parseFloat(pointsToCurrency(newBalance));
    
    res.status(200).json({
      message: "Points redeemed successfully",
      transaction,
      newBalance,
      currencyValue,
    });
  } catch (error) {
    console.error("Error redeeming points:", error);
    res.status(500).json({
      error: error.message || "Failed to redeem points",
    });
  }
};

/**
 * Award bonus points (admin only)
 * POST /api/loyalty-points/bonus/:userId
 */
export const awardBonusPointsToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { points, description } = req.body;
    
    if (!points || points <= 0) {
      return res.status(400).json({ error: "Points must be greater than 0" });
    }
    
    const transaction = await awardBonusPoints(
      userId,
      points,
      description || "Bonus points awarded"
    );
    
    res.status(200).json({
      message: "Bonus points awarded successfully",
      transaction,
    });
  } catch (error) {
    console.error("Error awarding bonus points:", error);
    res.status(500).json({ error: "Failed to award bonus points" });
  }
};

export default {
  getMyPointsBalance,
  getMyPointsHistory,
  redeemMyPoints,
  awardBonusPointsToUser,
};

