const Pedidos = require('../models/pedidos')
const Token = require('../models/token')

exports.crearPedido = async (req, res) => { 
    try {
        if(await Token(req, "administrador")){
 
            const pedido = await Pedidos.crearPedido(req.body)
            res.send(pedido);
        } else {
            res.send('Acceso denegado')
        }
    } catch (error) {
        console.log(error); 
        res.status(500).send('Hubo un error');
    }
};

exports.obtenerPedidos = async (req, res) => {
    try {
        if(await Token(req, "administrador")){
 
            const pedidos = await Pedidos.obtenerPedidos();
            res.json(pedidos)
        } else {
            res.send('Acceso denegado')
        }  
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarPedido = async (req, res) => {
    try {
        if(await Token(req, "administrador")){

            const {fecha, anotacion} = req.body

            let pedido;

            if(fecha || anotacion){
                pedido = await Pedidos.agregarPruebaCalce(req.params.id, req.body)
            } else {
                pedido = await Pedidos.actualizarPedido(req.params.id, req.body);
            }
 
            res.json(pedido);

        } else {
            res.send('Acceso denegado')
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarPedidoCalce = async (req, res) => {
    try {
        if(await Token(req, "administrador")){

            const pedidoCalce = await Pedidos.actualizarPedidoCalce(req.params.id, req.body)
 
            res.json(pedidoCalce);

        } else {
            res.send('Acceso denegado')
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPedido = async (req, res) => {
    try {
        if(await Token(req, "administrador")){
 
            const pedido = await Pedidos.obtenerPedido(req.params.id);
            res.json(pedido);
        } else {
            res.send('Acceso denegado')
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarPedido = async (req, res) => {
    try{
        if(await Token(req, "administrador")){
 
            const pedido = await Pedidos.eliminarPedido(req.params.id);
            res.status(200).json(pedido);
        } else {
            res.send('Acceso denegado')
        }  
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
