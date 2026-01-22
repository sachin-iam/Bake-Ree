// server/server.js
import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { initializeSocket } from "./config/socket.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Create HTTP server (required for Socket.io)
const httpServer = createServer(app);

// Initialize Socket.io
initializeSocket(httpServer);

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // ✅ allow frontend access
app.use(express.json()); // ✅ parse JSON body

// Route Imports
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import authRoutes from "./routes/auth.js";
import analyticsRoutes from "./routes/analytics.js";
import customerRoutes from "./routes/customerRoutes.js"; // ✅ customer routes
import customerAnalyticsRoutes from "./routes/customerAnalytics.js"; // ✅ customer analytics routes
import loyaltyPointsRoutes from "./routes/loyaltyPoints.js"; // ✅ loyalty points routes
import notificationPreferencesRoutes from "./routes/notificationPreferences.js"; // ✅ notification preferences routes
import wishlistRoutes from "./routes/wishlist.js"; // ✅ wishlist routes
import categoryRoutes from "./routes/categories.js"; // ✅ category management routes
import deliveryRoutes from "./routes/delivery.js"; // ✅ delivery management routes
import deliveryAddressRoutes from "./routes/deliveryAddresses.js"; // ✅ delivery address routes
import deliveryZoneRoutes from "./routes/deliveryZones.js"; // ✅ delivery zone routes
import kitchenStaffRoutes from "./routes/kitchenStaff.js"; // ✅ kitchen staff management routes
import addressRoutes from "./routes/addresses.js"; // ✅ user delivery addresses routes
import tierManagementRoutes from "./routes/tierManagement.js"; // ✅ tier management routes
import hrEmployeesRoutes from "./routes/hrEmployees.js";
import hrRolesRoutes from "./routes/hrRoles.js";
import hrAttendanceRoutes from "./routes/hrAttendance.js";
import hrShiftsRoutes from "./routes/hrShifts.js";
import hrLeavesRoutes from "./routes/hrLeaves.js";
import hrPayrollRoutes from "./routes/hrPayroll.js";
import hrPayslipsRoutes from "./routes/hrPayslips.js";
import hrPerformanceRoutes from "./routes/hrPerformance.js";
import hrApprovalsRoutes from "./routes/hrApprovals.js";
import hrDocumentsRoutes from "./routes/hrDocuments.js";
import inventoryRoutes from "./routes/inventory.js";
import procurementRoutes from "./routes/procurement.js";

// Route Mounts
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/customer-analytics", customerAnalyticsRoutes);
app.use("/api/loyalty-points", loyaltyPointsRoutes);
app.use("/api/notification-preferences", notificationPreferencesRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/delivery-addresses", deliveryAddressRoutes);
app.use("/api/delivery-zones", deliveryZoneRoutes);
app.use("/api/kitchen-staff", kitchenStaffRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/tier-management", tierManagementRoutes);
app.use("/api/hr/employees", hrEmployeesRoutes);
app.use("/api/hr/roles", hrRolesRoutes);
app.use("/api/hr/attendance", hrAttendanceRoutes);
app.use("/api/hr/shifts", hrShiftsRoutes);
app.use("/api/hr/leaves", hrLeavesRoutes);
app.use("/api/hr/payroll", hrPayrollRoutes);
app.use("/api/hr/payslips", hrPayslipsRoutes);
app.use("/api/hr/performance", hrPerformanceRoutes);
app.use("/api/hr/approvals", hrApprovalsRoutes);
app.use("/api/hr/documents", hrDocumentsRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/procurement", procurementRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🍞 Bake Ree API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔌 Socket.io ready for connections`);
});
