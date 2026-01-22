import mongoose from "mongoose";
import crypto from "crypto";

const passwordResetTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
      index: { expireAfterSeconds: 0 }, // MongoDB TTL index
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Generate a secure random token
passwordResetTokenSchema.statics.generateToken = function () {
  return crypto.randomBytes(32).toString("hex");
};

// Find a valid token
passwordResetTokenSchema.statics.findValidToken = async function (token) {
  return await this.findOne({
    token,
    used: false,
    expiresAt: { $gt: new Date() },
  });
};

const PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  passwordResetTokenSchema
);

export default PasswordResetToken;

