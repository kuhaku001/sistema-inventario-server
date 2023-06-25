const express = require('express');
const router = express.Router();
const materialesController=require('../controller/materialesController')



// api/materiales
router.post('/',materialesController.crearMateriales)
router.get('/',materialesController.obtenerMateriales)
router.put('/:id',materialesController.actualizarMateriales)
router.get('/:id',materialesController.obtenerMaterial)
router.delete('/:id',materialesController.eliminarMaterial)


module.exports = router;