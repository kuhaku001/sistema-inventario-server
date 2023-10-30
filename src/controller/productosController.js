const productoModel = require('../models/productosModels'); 
const Token = require('./autentificarToken')

const crearProducto = async (req, res) => {
    if(Token(req)){
        try {

            const producto = productoModel(req.body);

            await producto.save();
            res.status(200).send(producto)
            
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
};

module.exports = {crearProducto}