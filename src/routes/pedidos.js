const express = require('express');
const router = express.Router();
const pedidosController=require('../controller/pedidosController')



// api/materiales
router.post('/',pedidosController.crearPedido)
router.get('/',pedidosController.obtenerPedidos)
router.put('/:id',pedidosController.actualizarPedido)
router.get('/:id',pedidosController.obtenerPedido)
router.delete('/:id',pedidosController.eliminarPedido)

router.post('/agregarcliente/:id',pedidosController.agregarPedidoCliente)
router.get('/mostrarpedidos/:id',pedidosController.MostrarDatosPedidos)






module.exports = router;