import mongoose from "mongoose";

const outstandingSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", index: true },
    totalOutstanding: { type: Number, default: 0 },
    agingBuckets: { type: Object },
    lastPaymentAt: { type: Date },
  },
  { timestamps: true }
);

const Outstanding =
  mongoose.models.Outstanding || mongoose.model("Outstanding", outstandingSchema);

export default Outstanding;
