import mongoose from "mongoose";
import Order from "../models/Order.js";

/**
 * Place a new order
 * - Client se productId ya product dono accept
 * - Normalize: sirf `items.product` save karo
 * - Server-side totals + deliveryCharge compute
 * - Return populated order
 */
export const createOrder = async (req, res) => {
  try {
    const { items = [], orderType = "Pickup" } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "At least one item is required" });
    }

    // Normalize to `product` only
    const normalizedItems = items.map((raw) => {
      const idValue = raw.product || raw.productId; // accept either key
      if (!mongoose.Types.ObjectId.isValid(idValue)) {
        throw new Error(`Invalid product ID: ${idValue}`);
      }
      return {
        product: new mongoose.Types.ObjectId(idValue),
        quantity: Number(raw.quantity) || 0,
        price: Number(raw.price) || 0,
      };
    });

    // Totals
    const itemsTotal = normalizedItems.reduce(
      (sum, it) => sum + it.quantity * it.price,
      0
    );
    const discount = Number(req.body.discount ?? 0);
    const tax = Number(req.body.tax ?? 0);
    const deliveryCharge =
      req.body.deliveryCharge !== undefined
        ? Number(req.body.deliveryCharge)
        : orderType === "Delivery"
        ? 49
        : 0;

    const totalAmount = itemsTotal - discount + tax + deliveryCharge;

    const created = await Order.create({
      user: req.user._id,
      items: normalizedItems,
      simplifiedItems: req.body.simplifiedItems,
      orderType,
      status: req.body.status,
      deliveryCharge,
      totalAmount,
      specialInstructions: req.body.specialInstructions,
    });

    const order = await Order.findById(created._id)
      .setOptions({ strictPopulate: false })
      .populate("user", "name email phone")
      .populate("items.product", "name image price");

    return res.status(201).json(order);
  } catch (err) {
    console.error("Order creation error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Logged-in user's orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .setOptions({ strictPopulate: false })
      .populate("user", "name email phone")
      .populate("items.product", "name image price");

    res.status(200).json(orders);
  } catch (err) {
    console.error("Get user orders error:", err);
    res.status(500).json({ error: err.message });
  }
};

// My orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .setOptions({ strictPopulate: false })
      .populate("user", "name email phone")
      .populate("items.product", "name image price");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get my orders error:", error);
    res.status(500).json({ error: "Failed to fetch your orders" });
  }
};

// Order by ID (invoice page)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .setOptions({ strictPopulate: false })
      .populate("user", "name email phone")
      .populate("items.product", "name image price");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update status
export const updateOrderStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }

    const allowed = ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"];
    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    )
      .setOptions({ strictPopulate: false })
      .populate("user", "name email phone")
      .populate("items.product", "name image price");

    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Kitchen (Pending/Preparing/Ready)
export const getKitchenOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ["Pending", "Preparing", "Ready"] },
    })
      .setOptions({ strictPopulate: false })
      .populate({ path: "items.product", select: "name image" })
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

// Admin: all orders (optional ?status)
export const getAllOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const orders = await Order.find(filter)
      .setOptions({ strictPopulate: false })
      .populate("user", "name email phone")
      .populate("items.product", "name image price"); // 👈 ONLY product

    res.status(200).json(orders);
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ error: "Failed to fetch all orders" });
  }
};

// Analytics
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

export const getTypeRevenue = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ["Ready", "Delivered"] },
    });
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

export const getRecentOrders = async (req, res) => {
  try {
    const recent = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .setOptions({ strictPopulate: false })
      .populate("user", "name")
      .populate("items.product", "name image");

    res.status(200).json(recent);
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    res.status(500).json({ message: "Failed to load recent orders" });
  }
};
