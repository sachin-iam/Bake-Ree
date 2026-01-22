import mongoose from "mongoose";

const automationRuleSchema = new mongoose.Schema(
  {
    trigger: { type: Object },
    segmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Segment" },
    action: { type: Object },
    cooldown: { type: Number },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const AutomationRule =
  mongoose.models.AutomationRule || mongoose.model("AutomationRule", automationRuleSchema);

export default AutomationRule;
