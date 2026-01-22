import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, sparse: true },
    phone: String,
    emergencyContact: {
      name: String,
      phone: String,
      relation: String,
    },
    department: String,
    store: String,
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    status: {
      type: String,
      enum: ["ACTIVE", "ONBOARDING", "INACTIVE", "TERMINATED"],
      default: "ONBOARDING",
    },
    compensation: {
      salaryType: { type: String, enum: ["MONTHLY", "HOURLY"], default: "MONTHLY" },
      basePay: { type: Number, default: 0 },
      allowances: [{ label: String, amount: Number }],
      deductions: [{ label: String, amount: Number }],
    },
    bankDetails: {
      accountName: String,
      accountNumber: String,
      bankName: String,
      ifsc: String,
    },
    taxIds: {
      pan: String,
      aadhaar: String,
      taxNumber: String,
    },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
