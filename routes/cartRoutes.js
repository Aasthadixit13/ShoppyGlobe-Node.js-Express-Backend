const express = require('express');
const {
  addToCart,
  getCart, // ← NEW: import getCart
  updateCartItem,
  removeFromCart,
} = require('../controllers/cartController');

const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authentication to all routes
router.use(protect);

// Cleaner way using .route()
router
  .route('/')
  .get(getCart) // ← GET /api/cart          → fetch current user's cart
  .post(addToCart); // ← POST /api/cart         → add item to cart

// Update or remove specific item (by cart item sub-document _id)
router
  .route('/:id')
  .put(updateCartItem) // ← PUT    /api/cart/:id
  .delete(removeFromCart); // ← DELETE /api/cart/:id

module.exports = router;
