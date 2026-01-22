import CustomerProfile from "../models/CustomerProfile.js";
import Order from "../models/Order.js";
import { emitToAdmin } from "./socketService.js";

// Tier thresholds based on lifetime spending
export const TIER_THRESHOLDS = {
  Bronze: 0,
  Silver: 2000,
  Gold: 5000,
  Platinum: 10000,
};

/**
 * Calculate membership tier based on lifetime spending
 * @param {Number} lifetimeSpending - Total lifetime spending
 * @returns {String} Membership tier
 */
export const calculateMembershipTier = (lifetimeSpending) => {
  if (lifetimeSpending >= TIER_THRESHOLDS.Platinum) {
    return "Platinum";
  } else if (lifetimeSpending >= TIER_THRESHOLDS.Gold) {
    return "Gold";
  } else if (lifetimeSpending >= TIER_THRESHOLDS.Silver) {
    return "Silver";
  }
  return "Bronze";
};

/**
 * Automatically update user's membership tier
 * @param {String} userId - User ID
 * @param {Boolean} forceRecalculate - Force recalculation of spending
 * @returns {Object} Updated profile with tier information
 */
export const updateMembershipTier = async (userId, forceRecalculate = false) => {
  try {
    // Get current profile
    let profile = await CustomerProfile.findOne({ user: userId });
    
    if (!profile) {
      // Profile doesn't exist, create default
      profile = await CustomerProfile.create({
        user: userId,
        membershipTier: "Bronze",
        lifetimeSpending: 0,
      });
      return profile;
    }

    // If force recalculate or profile is stale, recalculate spending
    let lifetimeSpending = profile.lifetimeSpending;
    
    if (forceRecalculate || !profile.lastCalculated || 
        (Date.now() - new Date(profile.lastCalculated).getTime()) > 3600000) { // 1 hour
      // Recalculate from orders
      const orders = await Order.find({
        user: userId,
        status: { $ne: "Cancelled" },
      });
      
      lifetimeSpending = orders.reduce(
        (sum, order) => sum + (order.totalAmount || 0),
        0
      );
    }

    // Calculate new tier
    const newTier = calculateMembershipTier(lifetimeSpending);
    const oldTier = profile.membershipTier;

    // Update profile if tier changed or spending changed
    if (newTier !== oldTier || lifetimeSpending !== profile.lifetimeSpending) {
      const updatedProfile = await CustomerProfile.findOneAndUpdate(
        { user: userId },
        {
          membershipTier: newTier,
          lifetimeSpending,
          lastCalculated: new Date(),
        },
        { new: true }
      );

      // Notify if tier upgraded
      if (newTier !== oldTier && isTierUpgrade(oldTier, newTier)) {
        // Emit tier upgrade notification (for customer notification system)
        emitToAdmin("tier:upgraded", {
          userId,
          oldTier,
          newTier,
          lifetimeSpending,
          timestamp: new Date(),
        });
      }

      return updatedProfile;
    }

    return profile;
  } catch (error) {
    console.error(`Error updating membership tier for user ${userId}:`, error);
    
    // Notify admin about the error
    await notifyAdminOfTierUpdateError(userId, error);
    
    throw error;
  }
};

/**
 * Check if tier change is an upgrade
 * @param {String} oldTier - Previous tier
 * @param {String} newTier - New tier
 * @returns {Boolean} True if upgrade
 */
const isTierUpgrade = (oldTier, newTier) => {
  const tierOrder = ["Bronze", "Silver", "Gold", "Platinum"];
  return tierOrder.indexOf(newTier) > tierOrder.indexOf(oldTier);
};

/**
 * Notify admin when automatic tier update fails
 * @param {String} userId - User ID
 * @param {Error} error - Error that occurred
 */
const notifyAdminOfTierUpdateError = async (userId, error) => {
  try {
    // Get user info for the notification
    const User = (await import("../models/User.js")).default;
    const user = await User.findById(userId).select("name email");
    
    const errorNotification = {
      type: "tier_update_error",
      userId,
      userName: user?.name || "Unknown",
      userEmail: user?.email || "Unknown",
      error: error.message,
      timestamp: new Date(),
      requiresManualAction: true,
    };

    // Emit to admin room via socket
    emitToAdmin("admin:notification", {
      type: "tier_update_error",
      title: "Tier Update Failed",
      message: `Failed to automatically update tier for user ${user?.name || userId}. Manual action required.`,
      data: errorNotification,
      priority: "high",
    });

    console.log(`⚠️ Admin notified of tier update error for user ${userId}`);
  } catch (notifyError) {
    console.error("Error notifying admin:", notifyError);
  }
};

/**
 * Manually update user's membership tier (admin only)
 * @param {String} userId - User ID
 * @param {String} newTier - New tier to set
 * @param {String} adminId - Admin user ID
 * @param {String} reason - Reason for manual update
 * @returns {Object} Updated profile
 */
export const manuallyUpdateTier = async (userId, newTier, adminId, reason = "Manual update by admin") => {
  try {
    // Validate tier
    const validTiers = ["Bronze", "Silver", "Gold", "Platinum"];
    if (!validTiers.includes(newTier)) {
      throw new Error(`Invalid tier: ${newTier}. Must be one of: ${validTiers.join(", ")}`);
    }

    // Get current profile
    let profile = await CustomerProfile.findOne({ user: userId });
    
    if (!profile) {
      // Create profile if it doesn't exist
      profile = await CustomerProfile.create({
        user: userId,
        membershipTier: newTier,
      });
    } else {
      const oldTier = profile.membershipTier;
      
      // Update tier
      profile = await CustomerProfile.findOneAndUpdate(
        { user: userId },
        {
          membershipTier: newTier,
          lastCalculated: new Date(),
        },
        { new: true }
      );

      // Log the manual update
      console.log(`✅ Admin ${adminId} manually updated tier for user ${userId}: ${oldTier} → ${newTier}. Reason: ${reason}`);
    }

    return profile;
  } catch (error) {
    console.error(`Error manually updating tier for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Get all users with tier update issues (for admin dashboard)
 * @returns {Array} List of users with tier update errors
 */
export const getTierUpdateIssues = async () => {
  // This would typically query a notifications/errors table
  // For now, we'll return users whose profiles haven't been updated recently
  // and might need attention
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const profilesNeedingUpdate = await CustomerProfile.find({
      $or: [
        { lastCalculated: { $lt: oneDayAgo } },
        { lastCalculated: { $exists: false } },
      ],
    })
      .populate("user", "name email")
      .limit(50);

    return profilesNeedingUpdate.map((profile) => ({
      userId: profile.user._id,
      userName: profile.user.name,
      userEmail: profile.user.email,
      currentTier: profile.membershipTier,
      lifetimeSpending: profile.lifetimeSpending,
      lastCalculated: profile.lastCalculated,
      needsUpdate: true,
    }));
  } catch (error) {
    console.error("Error getting tier update issues:", error);
    return [];
  }
};

export default {
  calculateMembershipTier,
  updateMembershipTier,
  manuallyUpdateTier,
  getTierUpdateIssues,
  TIER_THRESHOLDS,
};
