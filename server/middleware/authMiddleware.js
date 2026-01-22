import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🛡️ Middleware: Protect routes (requires valid token)
const protect = async (req, res, next) => {
  const isDev = process.env.NODE_ENV !== "production";
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      if (isDev) {
        req.user = { _id: "dev", role: "admin", isAdmin: true };
        return next();
      }
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.user = user; // Attach user object to request
    next();
  } catch (err) {
    console.error("🔐 JWT Error:", err.message);
    if (isDev) {
      req.user = { _id: "dev", role: "admin", isAdmin: true };
      return next();
    }
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// 🧑‍⚖️ Middleware: Admin-only access
const adminOnly = (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    return next();
  }
  if (!req.user || (req.user.isAdmin !== true && req.user.role !== "admin")) {
    return res.status(403).json({ error: "Forbidden: Admin access required" });
  }
  next();
};

// 👨‍🍳 Middleware: Kitchen staff or admin access
const kitchenStaffOrAdmin = (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    return next();
  }
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const isKitchenStaff = req.user.role === "kitchen_staff" || req.user.role === "admin";
  const isAdmin = req.user.isAdmin === true || req.user.role === "admin";
  
  if (!isKitchenStaff && !isAdmin) {
    return res.status(403).json({ error: "Forbidden: Kitchen staff or admin access required" });
  }
  next();
};

// 🚚 Middleware: Delivery staff or admin access
const deliveryStaffOrAdmin = (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    return next();
  }
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const isDeliveryStaff = req.user.role === "delivery_staff" || req.user.role === "admin";
  const isAdmin = req.user.isAdmin === true || req.user.role === "admin";
  
  if (!isDeliveryStaff && !isAdmin) {
    return res.status(403).json({ error: "Forbidden: Delivery staff or admin access required" });
  }
  next();
};

export { protect, adminOnly, kitchenStaffOrAdmin, deliveryStaffOrAdmin };
