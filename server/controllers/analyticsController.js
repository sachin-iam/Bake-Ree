const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

exports.getAnalyticsData = async (req, res) => {
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
