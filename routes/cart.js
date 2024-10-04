// routes/cart.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Endpoint para añadir productos al carrito
router.post('/add', cartController.addToCart);

// Endpoint para ver el carrito
router.get('/', cartController.getCart);

// Endpoint para eliminar productos del carrito
router.delete('/remove', cartController.removeFromCart);

module.exports = router;

