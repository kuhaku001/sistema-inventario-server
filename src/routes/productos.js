const express = require('express');
const router = express.Router();
const productosController=require('../controller/productosController')


// api/productos
router.post('/',productosController.crearProducto)
router.get('/',productosController.mostrarProductos)
router.put('/:id',productosController.actualizarProducto)
router.get('/:id',productosController.obtenerProductos)
router.delete('/:id',productosController.eliminarProducto)

router.put('disponibilidad/:id',productosController.actualizarDisponibilidadProducto)


router.get('/usuario', productosController.mostrarProductosUsuario)

module.exports = router;
