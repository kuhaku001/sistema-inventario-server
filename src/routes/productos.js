const express = require('express');
const router = express.Router();
const productosController=require('../controller/productosController')
const uploads = require('../libs/multer')

// api/productos
router.get('/', productosController.mostrarProductos)
router.post('/', uploads.single('imagen'), productosController.crearProducto)
router.put('/:id', productosController.actualizarProducto)
router.get('/:id', productosController.obtenerProductos)
router.delete('/:id', productosController.eliminarProducto)

router.get('/usuario', productosController.mostrarProductosUsuario)

module.exports = router;
