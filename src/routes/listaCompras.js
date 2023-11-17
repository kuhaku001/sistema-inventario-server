const express = require('express');
const router = express.Router();
const ListaCompraController=require('../controller/ListaCompraController')


router.post('/',ListaCompraController.crearLista)
router.get('/:id',ListaCompraController.obtenerLista)
router.put('/:id',ListaCompraController.actualizarLista)
router.delete('/:id',ListaCompraController.eliminarLista)




module.exports = router;