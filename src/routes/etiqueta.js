const express = require('express');
const router = express.Router();
const etiquetasController=require('../controller/etiquetasController')

router.post('/',etiquetasController.crearEtiqueta)
router.get('/',etiquetasController.obtenerEtiquetas)
router.put('/:id',etiquetasController.actualizarEtiqueta)
router.get('/:id',etiquetasController.obtenerEtiqueta)
router.delete('/:id',etiquetasController.eliminarEtiqueta)
"borrar  esto"

module.exports = router;
