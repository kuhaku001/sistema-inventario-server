const {Router} = require('express');

const usuarioController = require('../controller/usuarioController');

const router = Router();

router.post('/token', usuarioController.obtenerTokenAdmin);
router.post('/tokenUser', usuarioController.obtenerTokenUsuario);

router.post('/admin', usuarioController.loginAdmin)
router.post('/', usuarioController.loginUsuario)
router.post('/register', usuarioController.registerUsuario)

module.exports = router