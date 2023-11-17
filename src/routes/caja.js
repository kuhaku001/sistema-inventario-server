const express = require('express');
const router = express.Router();
const cajaController=require('../controller/cajaController')


router.post('/',cajaController.crearCajas)
router.get('/:id',cajaController.obtenerCaja)
router.put('/:id',cajaController.actualizarCaja)
router.delete('/:id',cajaController.eliminarCaja)




module.exports = router;