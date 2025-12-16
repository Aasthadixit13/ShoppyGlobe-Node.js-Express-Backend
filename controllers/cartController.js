const Cart = require('../models/Cart');
const Product = require('../models/Product');

// GET /api/cart → Fetch user's cart
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    'items.product'
  );

  // If no cart exists, return empty one instead of null
  if (!cart) {
    return res.json({ items: [], totalItems: 0, totalPrice: 0 });
  }

  // Optional: calculate totals (very useful for frontend)
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum, item) => {
    return sum + item.quantity * (item.product?.price || 0);
  }, 0);

  res.json({
    ...cart.toObject(),
    totalItems,
    totalPrice,
  });
};

// POST /api/cart → Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  // Validate product exists
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Check stock
  if (product.stock < quantity) {
    return res.status(400).json({ message: 'Not enough stock available' });
  }

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = new Cart({ user: req.user.id, items: [] });
  }

  // Check if item already in cart
  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    if (existingItem.quantity > product.stock) {
      return res.status(400).json({ message: 'Not enough stock' });
    }
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  await cart.populate('items.product');

  // Return updated cart with totals
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum, item) => {
    return sum + item.quantity * (item.product?.price || 0);
  }, 0);

  res.status(200).json({
    ...cart.toObject(),
    totalItems,
    totalPrice,
  });
};

// PUT /api/cart/:id → Update item quantity
exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.id(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found in cart' });

  const product = await Product.findById(item.product);
  if (quantity > product.stock) {
    return res.status(400).json({ message: 'Not enough stock' });
  }

  item.quantity = quantity;
  await cart.save();
  await cart.populate('items.product');

  res.json(cart);
};

// DELETE /api/cart/:id → Remove item from cart
exports.removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.id(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found in cart' });

  item.remove();
  await cart.save();
  await cart.populate('items.product');

  res.json(cart);
};
