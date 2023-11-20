const Token = require('../models/token')
const Usuario = require('../models/usuario')

exports.obtenerTokenAdmin  = async (req, res) => {

    try {
        const autorizacion = await Token(req, "administrador");
        res.status(200).json(autorizacion)
        
    } catch (error) {
        res.status(401).send('No tienes un token valido')
    }
};

exports.obtenerTokenUsuario  =  async (req, res) => {

    try {
        const autorizacion = await Token(req, "usuario");
        res.status(200).json(autorizacion)

    } catch (error) {
        res.status(401).send('No tienes un token valido')
    }
};


exports.loginAdmin = async (req, res) => {
    try {
        const Token = await Usuario.loginAdmin(req.body);
        res.status(200).json(Token)

    } catch (error) {
        console.log(error)
    }
};

exports.loginUsuario =  async (req, res) => {

    try {
        const Token = await Usuario.loginUsuario(req.body);
        res.status(200).json(Token)

    } catch (error) {
        console.log(error)
    }
}

// Usuario.crearAdmin("admin", "123456789qwer-", "pc-test")