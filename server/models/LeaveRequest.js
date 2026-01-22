import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    approver: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    type: { type: String, enum: ["SICK", "CASUAL", "PAID", "UNPAID"], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: String,
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" },
    impact: {
      paidDays: { type: Number, default: 0 },
      unpaidDays: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);
export default LeaveRequest;
