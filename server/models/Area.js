import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
  {
    name: { type: String },
    zoneId: { type: String },
    city: { type: String },
    metricsCache: { type: Object },
  },
  { timestamps: true }
);

const Area = mongoose.models.Area || mongoose.model("Area", areaSchema);

export default Area;
