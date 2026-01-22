import mongoose from "mongoose";

const payslipSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    payrollRun: { type: mongoose.Schema.Types.ObjectId, ref: "PayrollRun", required: true },
    gross: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    net: { type: Number, default: 0 },
    status: { type: String, enum: ["DRAFT", "SENT", "ACKNOWLEDGED"], default: "DRAFT" },
  },
  { timestamps: true }
);

const Payslip = mongoose.model("Payslip", payslipSchema);
export default Payslip;
