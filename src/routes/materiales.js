const express = require('express');
const router = express.Router();
const materialesController=require('../controller/materialesController')


// api/materiales
router.post('/',materialesController.crearMateriales)
router.get('/',materialesController.mostrarMaterialEtiquetas)
router.put('/:id',materialesController.actualizarMateriales)
router.get('/:id',materialesController.obtenerMaterial)
router.delete('/:id',materialesController.eliminarMaterial)


router.put('/Etiqueta/:_id',materialesController.registrarEtiqueta)


module.exports = router;
