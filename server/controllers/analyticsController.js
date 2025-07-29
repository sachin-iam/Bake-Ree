import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const getAnalyticsData = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const totalRevenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    const totalCustomers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const revenueByOrderType = await Order.aggregate([
      {
        $group: {
          _id: "$orderType",
          revenue: { $sum: "$total" }
        }
      }
    ]);

    res.json({
      totalOrders,
      totalRevenue,
      totalCustomers,
      totalProducts,
      ordersByStatus,
      revenueByOrderType
    });
  } catch (err) {
    res.status(500).json({ error: 'Analytics fetch failed' });
  }
};

// 📊 Weekly Revenue and Orders
export const getWeeklyStats = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6); // last 7 days

    const stats = await Order.aggregate([
      {
        $match: { createdAt: { $gte: oneWeekAgo } },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalRevenue: { $sum: "$totalAmount" },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    console.error("Weekly stats error:", error);
    res.status(500).json({ message: "Failed to load weekly stats" });
  }
};
