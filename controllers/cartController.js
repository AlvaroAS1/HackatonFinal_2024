// controllers/cartController.js

const Cart = require('../models/Cart'); // Asegúrate de tener el modelo correcto

exports.addToCart = async (req, res) => {
    const userId = req.user ? req.user.id : '66ff7523e27f9542e6f4d0e3'; // Simula un ID de usuario si no hay autenticación
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity; // Incrementar cantidad
        } else {
            cart.items.push({ productId, quantity }); // Agregar nuevo producto
        }

        await cart.save();
        return res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Error al agregar el producto al carrito" });
    }
};

exports.getCart = async (req, res) => {
    const userId = req.user ? req.user.id : '66ff7523e27f9542e6f4d0e3'; // Simula un ID de usuario si no hay autenticación

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId'); // Poblamos los productos
        return res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Error al obtener el carrito" });
    }
};

exports.removeFromCart = async (req, res) => {
    const userId = req.user ? req.user.id : '66ff7523e27f9542e6f4d0e3'; // Simula un ID de usuario si no hay autenticación
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, error: "Carrito no encontrado" });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Error al eliminar el producto del carrito" });
    }
};

