import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

/**
 * Ek reusable aggregation expression jo order ka amount nikalta hai:
 *  - Prefer: totalAmount
 *  - Fallback: items ka sum (qty * price) + tax + deliveryCharge - discount
 */
const amountExpr = {
  $ifNull: [
    "$totalAmount",
    {
      $add: [
        {
          $reduce: {
            input: "$items",
            initialValue: 0,
            in: {
              $add: [
                "$$value",
                {
                  $multiply: [
                    { $ifNull: ["$$this.quantity", 0] },
                    { $ifNull: ["$$this.price", 0] },
                  ],
                },
              ],
            },
          },
        },
        { $ifNull: ["$tax", 0] },
        { $ifNull: ["$deliveryCharge", 0] },
        { $multiply: [-1, { $ifNull: ["$discount", 0] }] },
      ],
    },
  ],
};

/**
 * GET /api/analytics/admin/overview
 * Optional: ?onlyFulfilled=true  -> sirf Ready/Delivered orders consider karega
 */
export const getAnalyticsData = async (req, res) => {
  try {
    const match = {};
    if (req.query.onlyFulfilled === "true") {
      match.status = { $in: ["Ready", "Delivered"] };
    }

    const [
      totalOrders,
      totalCustomers,
      totalProducts,
      revenueAgg,
      ordersByStatus,
      revenueByOrderType,
    ] = await Promise.all([
      Order.countDocuments(match),
      User.countDocuments(),
      Product.countDocuments(),
      Order.aggregate([{ $match: match }, { $group: { _id: null, total: { $sum: amountExpr } } }]),
      Order.aggregate([{ $match: match }, { $group: { _id: "$status", count: { $sum: 1 } } }]),
      Order.aggregate([{ $match: match }, { $group: { _id: "$orderType", revenue: { $sum: amountExpr } } }]),
    ]);

    const totalRevenue = Number(revenueAgg?.[0]?.total || 0);

    res.json({
      totalOrders,
      totalRevenue,
      totalCustomers,
      totalProducts,
      ordersByStatus,
      revenueByOrderType,
    });
  } catch (err) {
    console.error("getAnalyticsData error:", err);
    res.status(500).json({ error: "Analytics fetch failed" });
  }
};

/**
 * GET /api/analytics/weekly
 * Last 7 days revenue & orderCount
 * Optional: ?onlyFulfilled=true
 */
export const getWeeklyStats = async (req, res) => {
  try {
    const start = new Date();
    start.setDate(start.getDate() - 6); // last 7 calendar days

    const match = { createdAt: { $gte: start } };
    if (req.query.onlyFulfilled === "true") {
      match.status = { $in: ["Ready", "Delivered"] };
    }

    const stats = await Order.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalRevenue: { $sum: amountExpr },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // ensure numeric types
    stats.forEach((s) => {
      s.totalRevenue = Number(s.totalRevenue || 0);
      s.orderCount = Number(s.orderCount || 0);
    });

    res.status(200).json(stats);
  } catch (error) {
    console.error("getWeeklyStats error:", error);
    res.status(500).json({ message: "Failed to load weekly stats" });
  }
};
