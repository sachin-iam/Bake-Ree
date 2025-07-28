const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    // 👤 User who placed the order
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // 🧾 Items: full product-based list
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],

    // 💵 Simplified Items (for Kitchen UI or quick view)
    simplifiedItems: [
      {
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number }
      }
    ],

    // 💰 Total price of the order
    totalAmount: { type: Number, required: true },

    // 📦 Order status
    status: {
      type: String,
      enum: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
      default: 'Pending',
      required: true
    },

    // 🚚 Pickup or Delivery
    orderType: {
      type: String,
      enum: ['Delivery', 'Pickup'],
      default: 'Pickup',
      required: true
    },

    // 🚛 Optional delivery charge
    deliveryCharge: { type: Number, default: 0 },

    // 📝 Optional notes
    specialInstructions: { type: String }
  },
  { timestamps: true } // ⏱️ includes createdAt + updatedAt
);

module.exports = mongoose.model('Order', orderSchema);
