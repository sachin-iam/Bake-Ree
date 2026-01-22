import {
  getCustomerAnalytics,
  getMonthlySpending,
} from "../services/customerAnalyticsService.js";
import User from "../models/User.js";

/**
 * Get customer analytics for logged-in user
 * GET /api/customer-analytics/me
 */
export const getMyAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const analytics = await getCustomerAnalytics(userId);
    res.status(200).json(analytics);
  } catch (error) {
    console.error("Error getting customer analytics:", error);
    res.status(500).json({ error: "Failed to get customer analytics" });
  }
};

/**
 * Get customer analytics by user ID (admin only)
 * GET /api/customer-analytics/:userId
 */
export const getCustomerAnalyticsById = async (req, res) => {
  try {
    const { userId } = req.params;
    const analytics = await getCustomerAnalytics(userId);
    res.status(200).json(analytics);
  } catch (error) {
    console.error("Error getting customer analytics:", error);
    res.status(500).json({ error: "Failed to get customer analytics" });
  }
};

/**
 * Get monthly spending breakdown
 * GET /api/customer-analytics/me/monthly
 */
export const getMyMonthlySpending = async (req, res) => {
  try {
    const userId = req.user._id;
    const months = parseInt(req.query.months) || 12;
    const monthlyData = await getMonthlySpending(userId, months);
    res.status(200).json(monthlyData);
  } catch (error) {
    console.error("Error getting monthly spending:", error);
    res.status(500).json({ error: "Failed to get monthly spending" });
  }
};

/**
 * Recalculate customer analytics (force update)
 * POST /api/customer-analytics/me/recalculate
 */
export const recalculateMyAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const analytics = await getCustomerAnalytics(userId, true); // Force recalculation
    res.status(200).json({
      message: "Analytics recalculated successfully",
      analytics,
    });
  } catch (error) {
    console.error("Error recalculating analytics:", error);
    res.status(500).json({ error: "Failed to recalculate analytics" });
  }
};

export default {
  getMyAnalytics,
  getCustomerAnalyticsById,
  getMyMonthlySpending,
  recalculateMyAnalytics,
};

