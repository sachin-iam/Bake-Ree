import mongoose from "mongoose";
import Order from "../models/Order.js";

// ✅ Place a new order (robust: item.product OR item.productId dono support)
export const createOrder = async (req, res) => {
  try {
    const itemsWithIds = req.body.items.map((item) => {
      const pid = item.product || item.productId; // ⬅️ frontend ke hisaab se dono me se jo aaye
      if (!mongoose.Types.ObjectId.isValid(pid)) {
        throw new Error(`Invalid product ID: ${pid}`);
      }
      return {
        ...item,
        product: new mongoose.Types.ObjectId(pid), // ⬅️ final field: product
      };
    });

    const order = await Order.create({
      ...req.body,
      items: itemsWithIds,
      user: req.user._id,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: err.message });
  }
};

// 👤 Legacy: Get all orders of the logged-in user (FIXED: by user, not params.id)
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("user", "name email phone")
      .populate("items.product", "name image price"); // ⬅️ product

    res.status(200).json(orders);
  } catch (err) {
    console.error("Get user orders error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Modern: Get my orders (same as above)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("user", "name email phone")
      .populate("items.product", "name image price"); // ⬅️ product

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get my orders error:", error);
    res.status(500).json({ error: "Failed to fetch your orders" });
  }
};

// 🔍 Get a specific order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email phone")
      .populate("items.product", "name image price"); // ⬅️ product

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🛡️ Admin/Kitchen: Update status (no change)
export const updateOrderStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ error: err.message });
  }
};

// 👨‍🍳 Kitchen: already correct (items.product)
export const getKitchenOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ["Pending", "Preparing", "Ready"] },
    })
      .populate({ path: "items.product", select: "name image" }) // ⬅️ ensure image too
      .sort({ createdAt: -1 });

    const cleaned = orders
      .map((o) => {
        const validItems = o.items.filter((it) => it.product !== null);
        return { ...o.toObject(), items: validItems };
      })
      .filter((o) => o.items.length > 0);

    res.status(200).json(cleaned);
  } catch (err) {
    console.error("Get kitchen orders error:", err);
    res.status(500).json({ error: "Failed to fetch kitchen orders" });
  }
};

// 🧾 Admin: Get all (with optional status)
export const getAllOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const orders = await Order.find(filter)
      .populate("user", "name email phone")
      .populate("items.product", "name image price"); // ⬅️ product

    res.status(200).json(orders);
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ error: "Failed to fetch all orders" });
  }
};

// 📈 Status distribution (no change)
export const getStatusDistribution = async (req, res) => {
  try {
    const orders = await Order.find();
    const statusCounts = {};
    orders.forEach((o) => {
      const s = o.status || "Unknown";
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    });
    res.json(statusCounts);
  } catch (err) {
    console.error("Status Distribution Error:", err);
    res.status(500).json({ error: "Failed to fetch status distribution" });
  }
};

// 💰 Revenue by type (no change)
export const getTypeRevenue = async (req, res) => {
  try {
    const orders = await Order.find({ status: { $in: ["Ready", "Delivered"] } });
    const typeRevenue = {};
    orders.forEach((o) => {
      const type = o.orderType || "Unknown";
      const total = o.totalAmount || 0;
      typeRevenue[type] = (typeRevenue[type] || 0) + total;
    });
    res.json(typeRevenue);
  } catch (err) {
    console.error("Type Revenue Error:", err);
    res.status(500).json({ error: "Failed to calculate revenue by type" });
  }
};

// 🕑 Recent orders
export const getRecentOrders = async (req, res) => {
  try {
    const recent = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name")
      .populate("items.product", "name image"); // ⬅️ product

    res.status(200).json(recent);
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    res.status(500).json({ message: "Failed to load recent orders" });
  }
};
