const express = require('express');
const { getProducts } = require('../controllers/productController'); // Asegúrate de que este import sea correcto
const router = express.Router();

router.get('/', getProducts); // Debe haber un controlador definido para este endpoint

module.exports = router;
