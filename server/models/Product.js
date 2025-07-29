import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
