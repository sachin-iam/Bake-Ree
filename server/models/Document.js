import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    name: String,
    type: String,
    url: String,
    status: { type: String, enum: ["ACTIVE", "EXPIRED"], default: "ACTIVE" },
    issuedAt: Date,
    expiresAt: Date,
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);
export default Document;
