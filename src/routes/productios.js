const express = require('express');
const router = express.Router();
const productosController=require('../controller/productosController')


// api/productos
router.post('/', productosController.crearProducto)

module.exports = router;