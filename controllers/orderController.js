const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const { userId, products, total, status } = req.body;

    try {
        const newOrder = await Order.create({ userId, products, total, status });
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: 'Error creating order', error: err });
    }
};

exports.getUserOrders = async (req, res) => {
    const userId = req.user.id; // Suponiendo que tienes middleware para autenticar al usuario

    try {
        const orders = await Order.find({ userId });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders', error: err });
    }
};
