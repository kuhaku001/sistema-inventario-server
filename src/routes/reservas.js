const {Router} = require('express');
const router = Router();
const reservaController = require('../controller/reservasController')

router.post('/', reservaController.crearReserva);

module.exports = router