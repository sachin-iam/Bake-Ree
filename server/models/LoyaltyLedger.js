import mongoose from "mongoose";

const loyaltyLedgerSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", index: true },
    pointsDelta: { type: Number },
    type: { type: String, enum: ["earn", "redeem", "expire", "adjust"] },
    refId: { type: String },
    createdAt: { type: Date },
  },
  { timestamps: true }
);

const LoyaltyLedger =
  mongoose.models.LoyaltyLedger || mongoose.model("LoyaltyLedger", loyaltyLedgerSchema);

export default LoyaltyLedger;
