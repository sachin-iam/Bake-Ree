const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// 🟢 Public routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);

// 🔐 Admin-only routes
router.post('/', protect, adminOnly, createProduct);
router.patch('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
