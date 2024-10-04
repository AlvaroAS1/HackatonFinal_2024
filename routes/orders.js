const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, createOrder); // Solo usuarios autenticados pueden crear órdenes
router.get('/', verifyToken, getUserOrders); // Solo usuarios autenticados pueden ver sus órdenes

module.exports = router;

