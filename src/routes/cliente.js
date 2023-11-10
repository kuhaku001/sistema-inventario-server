const express = require('express');
const router = express.Router();
const clienteController=require('../controller/clienteController')

router.post('/',clienteController.crearCliente)
router.get('/',clienteController.obtenerClientes)
router.put('/:id',clienteController.actualizarCliente)
router.get('/:id',clienteController.obtenerCliente)
router.delete('/:id',clienteController.eliminarCliente)




module.exports = router;