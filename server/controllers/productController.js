import Product from "../models/Product.js";

// 🔍 Get all products (sorted newest first)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// 🌟 Get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    const featured = await Product.find({ isFeatured: true });
    res.status(200).json(featured);
  } catch (err) {
    console.error("❌ Error fetching featured products:", err);
    res.status(500).json({ error: "Failed to fetch featured products" });
  }
};

// ➕ Add a new product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, isFeatured, stock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
      isFeatured: isFeatured || false,
      stock: stock || 0,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
};

// 🛠️ Update an existing product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// ❌ Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
