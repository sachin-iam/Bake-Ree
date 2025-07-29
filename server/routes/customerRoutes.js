// routes/customerRoutes.js
import express from 'express';
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  toggleActiveStatus,
  deleteCustomer,
  bulkDeleteCustomers,
} from '../controllers/customerController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication + admin access to all routes
router.use(protect, adminOnly);

// Customer API routes
router.get('/', getCustomers);                   // Get customers with filters, pagination
router.get('/:id', getCustomerById);             // Get a single customer by ID
router.post('/', createCustomer);                // Create a customer
router.put('/:id', updateCustomer);              // Update a customer
router.patch('/:id/toggle', toggleActiveStatus); // Toggle isActive field
router.delete('/:id', deleteCustomer);           // Delete a customer
router.delete('/', bulkDeleteCustomers);         // Bulk delete customers

export default router;
