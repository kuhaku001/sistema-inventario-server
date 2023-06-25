const {Router} = require('express');
const {login} = require('../database/login');
const jws = require('jsonwebtoken');
const verificarToken = require('../controller/autentificarToken')
const router = Router();

 router.post('/token', async (req, res) => {

     const bol = verificarToken(req);

     if (bol) {
        res.status(200).json(true)
     } else if (!bol) {
        res.status(200).json(false);
     } else {
        res.status(401).send('No tines un token valido')
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