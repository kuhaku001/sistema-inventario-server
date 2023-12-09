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

        if(Token.length <= 15){
            res.status(500).send(Token)
        }
        res.status(200).json(Token)

    } catch (error) {
        console.log(error)
    }
}

exports.registerUsuario =  async (req, res) => {

    try {

        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
        const re1 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/
        const {name, password} = req.body

        if(!re1.test(name)){
            res.status(401).json("Nombre de usuario con formato invalida")
        }

        if(!re.test(password)){
            res.status(401).json("Contraseña con formato invalida")
        }

        const user = await Usuario.crearUsuario(req.body);
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
    }
}
