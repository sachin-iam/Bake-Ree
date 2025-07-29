import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🛡️ Middleware: Protect routes (requires valid token)
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
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
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// 🧑‍⚖️ Middleware: Admin-only access
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.isAdmin !== true) {
    return res.status(403).json({ error: "Forbidden: Admin access required" });
  }
  next();
};

export { protect, adminOnly };
