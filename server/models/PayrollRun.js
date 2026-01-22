import mongoose from "mongoose";

const payrollRunSchema = new mongoose.Schema(
  {
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
    status: { type: String, enum: ["DRAFT", "APPROVED", "LOCKED"], default: "DRAFT" },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    totals: {
      gross: { type: Number, default: 0 },
      deductions: { type: Number, default: 0 },
      advances: { type: Number, default: 0 },
      net: { type: Number, default: 0 },
    },
    notes: String,
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    approvedAt: Date,
  },
  { timestamps: true }
);

const PayrollRun = mongoose.model("PayrollRun", payrollRunSchema);
export default PayrollRun;
