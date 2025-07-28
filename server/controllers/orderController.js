const mongoose = require('mongoose');
const Order = require('../models/Order');

// ✅ Place a new order
const createOrder = async (req, res) => {
  try {
    const itemsWithIds = req.body.items.map(item => {
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        throw new Error(`Invalid productId: ${item.productId}`);
      }

      return {
        ...item,
        productId: new mongoose.Types.ObjectId(item.productId)
      };
    });

    const order = await Order.create({
      ...req.body,
      items: itemsWithIds,
      user: req.user._id
    });

    res.status(201).json(order);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Legacy: Get all orders of the logged-in user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.productId');
    res.status(200).json(orders);
  } catch (err) {
    console.error('Get user orders error:', err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Modern: Get my orders (recommended)
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.productId', 'name image price');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ error: 'Failed to fetch your orders' });
  }
};

// ✅ Get a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.status(200).json(order);
  } catch (err) {
    console.error('Get order by ID error:', err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Admin/Kitchen: Update order status
const updateOrderStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.status(200).json(order);
  } catch (err) {
    console.error('Update order status error:', err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Kitchen: Get pending/preparing/ready orders only
const getKitchenOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ['Pending', 'Preparing', 'Ready'] }
    })
      .populate({
        path: 'items.productId',
        select: 'name',
        match: { _id: { $ne: null } }
      })
      .sort({ createdAt: -1 });

    const cleanedOrders = orders
      .map(order => {
        const validItems = order.items.filter(item => item.productId !== null);
        return { ...order.toObject(), items: validItems };
      })
      .filter(order => order.items.length > 0);

    res.status(200).json(cleanedOrders);
  } catch (err) {
    console.error('Get kitchen orders error:', err);
    res.status(500).json({ error: 'Failed to fetch kitchen orders' });
  }
};

// ✅ Admin: Get all orders (with optional ?status filter)
const getAllOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const orders = await Order.find(filter)
      .populate('user', 'name email')
      .populate('items.productId', 'name image price');

    res.status(200).json(orders);
  } catch (err) {
    console.error('Get all orders error:', err);
    res.status(500).json({ error: 'Failed to fetch all orders' });
  }
};

// 📈 Get order status distribution
const getStatusDistribution = async (req, res) => {
  try {
    const orders = await Order.find();
    const statusCounts = {};

    orders.forEach((order) => {
      const status = order.status || "Unknown";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    res.json(statusCounts);
  } catch (err) {
    console.error("Status Distribution Error:", err);
    res.status(500).json({ error: "Failed to fetch status distribution" });
  }
};

// 💰 Get revenue by order type
const getTypeRevenue = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ["Ready", "Delivered"] },
    });
    const typeRevenue = {};

    orders.forEach((order) => {
      const type = order.orderType || "Unknown";
      const total = order.totalAmount || 0;
      typeRevenue[type] = (typeRevenue[type] || 0) + total;
    });

    res.json(typeRevenue);
  } catch (err) {
    console.error("Type Revenue Error:", err);
    res.status(500).json({ error: "Failed to calculate revenue by type" });
  }
};

// 🕑 Get most recent 4 orders
const getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(4);

    res.status(200).json(recentOrders);
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    res.status(500).json({ message: "Failed to load recent orders" });
  }
};

// 👇 Add them to your export list
module.exports = {
  createOrder,
  getUserOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getKitchenOrders,
  getAllOrders,
  getStatusDistribution,
  getTypeRevenue,
  getRecentOrders, // ✅ ADDED HERE
};
