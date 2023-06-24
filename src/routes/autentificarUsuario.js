const {Router} = require('express');
const {login} = require('../database/login');
const jws = require('jsonwebtoken');
const verificarToken = require('./autentificarToken')
const router = Router();

router.get('/', (req, res) => {
    if (verificarToken(req, res)) {
        res.send("Valido")
    } else {
        res.status(401).send("No tienes autorizacion")
    }
});

router.post('/', async (req, res) => {

    const {name, password} = req.body;

    const data = await login(name, password)

    try {
        if( await data[0]){

            const token = jws.sign({_id : data[1]._id}, 'secretKey') // cambiar secretKey por variable de entorno
            res.status(200).json({token})
    
        } else {
            res.status(401).send("Error de Login ")
        };
    } catch (error) {
        console.log(error)
    }
    
})



module.exports = router