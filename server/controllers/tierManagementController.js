import {
  updateMembershipTier,
  manuallyUpdateTier,
  getTierUpdateIssues as fetchTierUpdateIssues,
  TIER_THRESHOLDS,
} from "../services/tierManagementService.js";
import CustomerProfile from "../models/CustomerProfile.js";
import User from "../models/User.js";

/**
 * Get all users with their loyalty tiers (admin only)
 * GET /api/tier-management/users
 */
export const getAllUsersWithTiers = async (req, res) => {
  try {
    const { page = 1, limit = 50, search = "", tier = "" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build query
    const query = {};
    if (tier) {
      query.membershipTier = tier;
    }

    // Get profiles with user info
    const profiles = await CustomerProfile.find(query)
      .populate("user", "name email")
      .sort({ lifetimeSpending: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Filter by search term if provided
    let filteredProfiles = profiles;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProfiles = profiles.filter(
        (profile) =>
          profile.user?.name?.toLowerCase().includes(searchLower) ||
          profile.user?.email?.toLowerCase().includes(searchLower)
      );
    }

    // Get total count
    const total = await CustomerProfile.countDocuments(query);

    res.status(200).json({
      users: filteredProfiles.map((profile) => ({
        userId: profile.user._id,
        userName: profile.user.name,
        userEmail: profile.user.email,
        currentTier: profile.membershipTier,
        lifetimeSpending: profile.lifetimeSpending,
        totalOrders: profile.totalOrders,
        lastCalculated: profile.lastCalculated,
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error getting users with tiers:", error);
    res.status(500).json({ error: "Failed to get users with tiers" });
  }
};

/**
 * Get user's tier information (admin only)
 * GET /api/tier-management/users/:userId
 */
export const getUserTierInfo = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await CustomerProfile.findOne({ user: userId })
      .populate("user", "name email");

    if (!profile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.status(200).json({
      userId: profile.user._id,
      userName: profile.user.name,
      userEmail: profile.user.email,
      currentTier: profile.membershipTier,
      lifetimeSpending: profile.lifetimeSpending,
      totalOrders: profile.totalOrders,
      averageOrderValue: profile.averageOrderValue,
      lastCalculated: profile.lastCalculated,
      tierThresholds: TIER_THRESHOLDS,
      nextTier: getNextTier(profile.membershipTier),
      spendingToNextTier: getSpendingToNextTier(profile.membershipTier, profile.lifetimeSpending),
    });
  } catch (error) {
    console.error("Error getting user tier info:", error);
    res.status(500).json({ error: "Failed to get user tier info" });
  }
};

/**
 * Manually update user's tier (admin only)
 * PUT /api/tier-management/users/:userId/tier
 */
export const updateUserTier = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newTier, reason } = req.body;
    const adminId = req.user._id;

    if (!newTier) {
      return res.status(400).json({ error: "newTier is required" });
    }

    const validTiers = ["Bronze", "Silver", "Gold", "Platinum"];
    if (!validTiers.includes(newTier)) {
      return res.status(400).json({
        error: `Invalid tier. Must be one of: ${validTiers.join(", ")}`,
      });
    }

    const updatedProfile = await manuallyUpdateTier(
      userId,
      newTier,
      adminId,
      reason || "Manual update by admin"
    );

    res.status(200).json({
      message: "Tier updated successfully",
      user: {
        userId: updatedProfile.user,
        currentTier: updatedProfile.membershipTier,
        lifetimeSpending: updatedProfile.lifetimeSpending,
      },
    });
  } catch (error) {
    console.error("Error updating user tier:", error);
    res.status(500).json({
      error: error.message || "Failed to update user tier",
    });
  }
};

/**
 * Force recalculation of user's tier (admin only)
 * POST /api/tier-management/users/:userId/recalculate
 */
export const recalculateUserTier = async (req, res) => {
  try {
    const { userId } = req.params;

    const updatedProfile = await updateMembershipTier(userId, true);

    res.status(200).json({
      message: "Tier recalculated successfully",
      user: {
        userId: updatedProfile.user,
        currentTier: updatedProfile.membershipTier,
        lifetimeSpending: updatedProfile.lifetimeSpending,
        lastCalculated: updatedProfile.lastCalculated,
      },
    });
  } catch (error) {
    console.error("Error recalculating user tier:", error);
    res.status(500).json({
      error: error.message || "Failed to recalculate user tier",
    });
  }
};

/**
 * Get tier update issues (admin only)
 * GET /api/tier-management/issues
 */
export const getTierUpdateIssues = async (req, res) => {
  try {
    const issues = await fetchTierUpdateIssues();
    res.status(200).json({ issues });
  } catch (error) {
    console.error("Error getting tier update issues:", error);
    res.status(500).json({ error: "Failed to get tier update issues" });
  }
};

/**
 * Get tier statistics (admin only)
 * GET /api/tier-management/statistics
 */
export const getTierStatistics = async (req, res) => {
  try {
    const tierCounts = await CustomerProfile.aggregate([
      {
        $group: {
          _id: "$membershipTier",
          count: { $sum: 1 },
          totalSpending: { $sum: "$lifetimeSpending" },
          avgSpending: { $avg: "$lifetimeSpending" },
        },
      },
    ]);

    const statistics = {
      Bronze: { count: 0, totalSpending: 0, avgSpending: 0 },
      Silver: { count: 0, totalSpending: 0, avgSpending: 0 },
      Gold: { count: 0, totalSpending: 0, avgSpending: 0 },
      Platinum: { count: 0, totalSpending: 0, avgSpending: 0 },
    };

    tierCounts.forEach((tier) => {
      if (statistics[tier._id]) {
        statistics[tier._id] = {
          count: tier.count,
          totalSpending: tier.totalSpending,
          avgSpending: Math.round(tier.avgSpending),
        };
      }
    });

    res.status(200).json({
      statistics,
      tierThresholds: TIER_THRESHOLDS,
    });
  } catch (error) {
    console.error("Error getting tier statistics:", error);
    res.status(500).json({ error: "Failed to get tier statistics" });
  }
};

// Helper functions
const getNextTier = (currentTier) => {
  const tierOrder = ["Bronze", "Silver", "Gold", "Platinum"];
  const currentIndex = tierOrder.indexOf(currentTier);
  return currentIndex < tierOrder.length - 1 ? tierOrder[currentIndex + 1] : null;
};

const getSpendingToNextTier = (currentTier, currentSpending) => {
  const nextTier = getNextTier(currentTier);
  if (!nextTier) return 0;
  const nextThreshold = TIER_THRESHOLDS[nextTier];
  return Math.max(0, nextThreshold - currentSpending);
};

export default {
  getAllUsersWithTiers,
  getUserTierInfo,
  updateUserTier,
  recalculateUserTier,
  getTierUpdateIssues,
  getTierStatistics,
};

