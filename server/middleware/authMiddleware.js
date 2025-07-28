const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🛡️ Middleware: Protect routes (requires valid token)
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

// 🧑‍⚖️ Middleware: Admin-only access
const adminOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

module.exports = {
  protect,
  adminOnly,
};
