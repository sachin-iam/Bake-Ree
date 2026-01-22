import mongoose from "mongoose";

const walletLedgerSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", index: true },
    type: { type: String, enum: ["credit", "debit", "refund", "adjustment"] },
    amount: { type: Number },
    reason: { type: String },
    refId: { type: String },
    createdAt: { type: Date },
  },
  { timestamps: true }
);

const WalletLedger =
  mongoose.models.WalletLedger || mongoose.model("WalletLedger", walletLedgerSchema);

export default WalletLedger;
