import mongoose from "mongoose";

const loyaltyRulesSchema = new mongoose.Schema(
  {
    earnRules: [{ type: Object }],
    redeemRules: [{ type: Object }],
    tierRules: [{ type: Object }],
  },
  { timestamps: true }
);

const LoyaltyRules =
  mongoose.models.LoyaltyRules || mongoose.model("LoyaltyRules", loyaltyRulesSchema);

export default LoyaltyRules;
