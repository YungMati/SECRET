const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// GET all products
router.get('/', productsController.getProducts);

// POST a new product
router.post('/', productsController.addProduct);

module.exports = router;
