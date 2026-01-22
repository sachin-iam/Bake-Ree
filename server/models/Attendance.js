import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    date: { type: Date, required: true },
    checkIn: Date,
    checkOut: Date,
    status: {
      type: String,
      enum: ["ON_TIME", "LATE", "ABSENT", "OVERTIME"],
      default: "ON_TIME",
    },
    overtimeMinutes: { type: Number, default: 0 },
    breakMinutes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
