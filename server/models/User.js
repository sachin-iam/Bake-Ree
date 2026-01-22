import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  isAdmin: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["customer", "kitchen_staff", "delivery_staff", "admin"],
    default: "customer",
  },
  isActive: { type: Boolean, default: true }, // For kitchen staff management
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
