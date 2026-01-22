import mongoose from "mongoose";

const crmNotificationSchema = new mongoose.Schema(
  {
    type: { type: String },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    payload: { type: Object },
    readAt: { type: Date },
  },
  { timestamps: true }
);

const CrmNotification =
  mongoose.models.CrmNotification || mongoose.model("CrmNotification", crmNotificationSchema);

export default CrmNotification;
