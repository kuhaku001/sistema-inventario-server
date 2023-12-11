const {Router} = require('express');
const router = Router();
const reservaController = require('../controller/reservasController')

router.post('/', reservaController.crearReserva);
router.get('/', reservaController.verReservas);

module.exports = router