const {Router} = require('express');
const {login} = require('../database/login')
const router = Router();

router.get('/', (req, res) => {
    res.send('inicio')
})


router.post('/', (req, res) => {
    const {nombre, contraseña} = req.body;
    login(nombre, contraseña);
    res.send('login')
})



module.exports = router