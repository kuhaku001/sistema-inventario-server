const express = require('express');
const router = express.Router();
const productosController = require('../controller/productosController')
const uploads = require('../libs/multer')

// api/productos
router.get('/', productosController.obtenerProductos)
router.post('/', uploads.single('imagen'), productosController.crearProducto)
router.put('/:id', uploads.single('imagen'), productosController.actualizarProducto)
router.get('/:id', productosController.obtenerProducto)
router.delete('/:id', productosController.eliminarProducto)

router.get('/usuario', productosController.mostrarProductosUsuario)

module.exports = router;
