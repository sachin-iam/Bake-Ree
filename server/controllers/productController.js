const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get featured
exports.getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ isFeatured: true });
  res.json(products);
};

// Create new product
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

// Update product
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
};

// Delete product
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};
