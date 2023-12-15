const express = require('express');
const router = express.Router();
const productosController = require('../controller/productosController')
const uploads = require('../libs/multer')

// api/productos
router.get('/', productosController.obtenerProductos)
router.get('/usuario', productosController.mostrarProductosUsuario)
router.get('/usuario/:id', productosController.obtenerProducto)

router.post('/', uploads.single('imagen'), productosController.crearProducto) // subir imagen
router.put('/:id', uploads.single('imagen'), productosController.actualizarProducto) // modificar imagen
router.delete('/:id', productosController.eliminarProducto) // eliminar producto

module.exports = router;
