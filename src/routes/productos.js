const express = require('express');
const router = express.Router();
const productosController=require('../controller/productosController')


// api/productos
router.post('/',productosController.crearProducto)
router.get('/',productosController.mostrarProductos)
router.put('/:id',productosController.actualizarProducto)
router.get('/:id',productosController.obtenerProductos)
router.delete('/:id',productosController.eliminarProducto)

module.exports = router;