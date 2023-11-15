const {Router} = require('express');
const jws = require('jsonwebtoken');
const router = Router();
require('dotenv').config();

const Token = require('../libs/autentificarToken')
const {login, loginUsuario} = require('../libs/login');

router.post('/token', async (req, res) => {

     const bol = await Token(req, "administrador");

     if (bol) {
        res.status(200).json(true)
     } else if (!bol) {
        res.status(200).json(false);
     } else {
        res.status(401).send('No tines un token valido')
     }
 });

router.post('/tokenUser', async (req, res) => {

    const bol = await  Token(req, "usuario");

    if (bol) {
       res.status(200).json(true)
    } else if (!bol) {
       res.status(200).json(false);
    } else {
       res.status(401).send('No tines un token valido')
    }
});

router.post('/admin', async (req, res) => {
    
    const {name, password} = req.body;

    const data = await login(name, password)

    try {
        if( await data[0]){

            const token = jws.sign({_id : data[1]._id}, process.env.JSON_WEB_TOKEN_KEY)

            res.status(200).json({token})

        } else {

            res.status(401).send("Error de Login ")
        };
    } catch (error) {
        console.log(error)
    }

})

router.post('/', async (req, res) => {
    
    const {name, password} = req.body;

    const data = await loginUsuario(name, password)

    try {
        if( await data[0]){

            const token = jws.sign({_id : data[1]._id}, process.env.JSON_WEB_TOKEN_KEY) 
            res.status(200).json({token})

        } else {

            res.status(401).send("Error de Login ")
        };
    } catch (error) {
        console.log(error)
    }

})

module.exports = router