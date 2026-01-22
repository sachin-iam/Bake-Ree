import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema(
  {
    entityType: { type: String, required: true },
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    approver: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" },
    note: String,
  },
  { timestamps: true }
);

const Approval = mongoose.model("Approval", approvalSchema);
export default Approval;
