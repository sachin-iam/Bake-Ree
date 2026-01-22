import Order from "../models/Order.js";
import CustomerProfile from "../models/CustomerProfile.js";

/**
 * Calculate and update customer analytics
 * @param {String} userId - User ID
 * @returns {Object} Customer analytics data
 */
export const calculateCustomerAnalytics = async (userId) => {
  try {
    // Get all orders for this user
    const orders = await Order.find({
      user: userId,
      status: { $ne: "Cancelled" }, // Count active + completed orders
    }).sort({ createdAt: 1 });

    if (orders.length === 0) {
      // Return default profile for new customers
      return {
        lifetimeSpending: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastOrderDate: null,
        favoriteProducts: [],
        preferredOrderType: null,
        membershipTier: "Bronze",
        visitFrequency: "New",
      };
    }

    // Calculate spending analytics
    const lifetimeSpending = orders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );
    const totalOrders = orders.length;
    const averageOrderValue =
      totalOrders > 0 ? lifetimeSpending / totalOrders : 0;

    // Calculate purchase streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let lastOrderDate = null;

    if (orders.length > 0) {
      lastOrderDate = orders[orders.length - 1].createdAt;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Group orders by date
      const ordersByDate = {};
      orders.forEach((order) => {
        const date = new Date(order.createdAt);
        date.setHours(0, 0, 0, 0);
        const dateKey = date.toISOString().split("T")[0];
        if (!ordersByDate[dateKey]) {
          ordersByDate[dateKey] = [];
        }
        ordersByDate[dateKey].push(order);
      });

      const sortedDates = Object.keys(ordersByDate).sort();
      
      // Calculate current streak (consecutive days with orders)
      let checkDate = new Date(today);
      for (let i = 0; i < 365; i++) {
        const dateKey = checkDate.toISOString().split("T")[0];
        if (ordersByDate[dateKey]) {
          currentStreak++;
        } else {
          break;
        }
        checkDate.setDate(checkDate.getDate() - 1);
      }

      // Calculate longest streak
      tempStreak = 0;
      for (let i = 0; i < sortedDates.length; i++) {
        const currentDate = new Date(sortedDates[i]);
        const prevDate =
          i > 0 ? new Date(sortedDates[i - 1]) : null;

        if (
          !prevDate ||
          (currentDate - prevDate) / (1000 * 60 * 60 * 24) <= 1
        ) {
          tempStreak++;
          longestStreak = Math.max(longestStreak, tempStreak);
        } else {
          tempStreak = 1;
        }
      }
    }

    // Calculate favorite products
    const productCounts = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const productId = item.product?.toString() || item.product?._id?.toString();
        if (productId) {
          if (!productCounts[productId]) {
            productCounts[productId] = 0;
          }
          productCounts[productId] += item.quantity;
        }
      });
    });

    const favoriteProducts = Object.entries(productCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5) // Top 5 favorite products
      .map(([productId, orderCount]) => ({
        product: productId,
        orderCount,
      }));

    // Calculate preferred order type
    const orderTypeCounts = {};
    orders.forEach((order) => {
      const type = order.orderType || "Pickup";
      orderTypeCounts[type] = (orderTypeCounts[type] || 0) + 1;
    });

    const preferredOrderType =
      Object.keys(orderTypeCounts).length > 0
        ? Object.entries(orderTypeCounts).sort(([, a], [, b]) => b - a)[0][0]
        : null;

    // Determine membership tier based on lifetime spending
    let membershipTier = "Bronze";
    if (lifetimeSpending >= 10000) {
      membershipTier = "Platinum";
    } else if (lifetimeSpending >= 5000) {
      membershipTier = "Gold";
    } else if (lifetimeSpending >= 2000) {
      membershipTier = "Silver";
    }

    // Determine visit frequency
    let visitFrequency = "New";
    const daysSinceFirstOrder =
      orders.length > 0
        ? (new Date() - new Date(orders[0].createdAt)) / (1000 * 60 * 60 * 24)
        : 0;
    const ordersPerMonth = daysSinceFirstOrder > 0
      ? (totalOrders / daysSinceFirstOrder) * 30
      : 0;

    if (totalOrders >= 20 && ordersPerMonth >= 2) {
      visitFrequency = "VIP";
    } else if (totalOrders >= 10 && ordersPerMonth >= 1) {
      visitFrequency = "Regular";
    } else if (totalOrders >= 3) {
      visitFrequency = "Occasional";
    }

    // Create or update customer profile
    const profileData = {
      user: userId,
      lifetimeSpending,
      totalOrders,
      averageOrderValue,
      currentStreak,
      longestStreak,
      lastOrderDate,
      favoriteProducts,
      preferredOrderType,
      membershipTier,
      visitFrequency,
      lastCalculated: new Date(),
    };

    const profile = await CustomerProfile.findOneAndUpdate(
      { user: userId },
      profileData,
      { upsert: true, new: true }
    );

    return profile.toObject();
  } catch (error) {
    console.error("Error calculating customer analytics:", error);
    throw error;
  }
};

/**
 * Get customer analytics (with caching)
 * @param {String} userId - User ID
 * @param {Boolean} forceRecalculate - Force recalculation
 * @returns {Object} Customer analytics
 */
export const getCustomerAnalytics = async (userId, forceRecalculate = false) => {
  try {
    let profile = await CustomerProfile.findOne({ user: userId });

    // Recalculate if profile doesn't exist, is stale (older than 1 hour), or forced
    const shouldRecalculate =
      !profile ||
      forceRecalculate ||
      !profile.lastCalculated ||
      (new Date() - new Date(profile.lastCalculated)) / (1000 * 60 * 60) > 1;

    if (shouldRecalculate) {
      return await calculateCustomerAnalytics(userId);
    }

    return profile.toObject();
  } catch (error) {
    console.error("Error getting customer analytics:", error);
    throw error;
  }
};

/**
 * Get monthly spending breakdown
 * @param {String} userId - User ID
 * @param {Number} months - Number of months to analyze
 * @returns {Array} Monthly spending data
 */
export const getMonthlySpending = async (userId, months = 12) => {
  try {
    const orders = await Order.find({
      user: userId,
      status: { $ne: "Cancelled" },
      createdAt: {
        $gte: new Date(
          new Date().setMonth(new Date().getMonth() - months)
        ),
      },
    }).sort({ createdAt: 1 });

    const monthlyData = {};
    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          total: 0,
          orders: 0,
        };
      }
      
      monthlyData[monthKey].total += order.totalAmount || 0;
      monthlyData[monthKey].orders += 1;
    });

    return Object.values(monthlyData);
  } catch (error) {
    console.error("Error getting monthly spending:", error);
    throw error;
  }
};

export default {
  calculateCustomerAnalytics,
  getCustomerAnalytics,
  getMonthlySpending,
};
