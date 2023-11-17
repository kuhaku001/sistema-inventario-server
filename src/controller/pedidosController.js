const Pedidos = require('../models/pedidos')

exports.crearPedido = async (req, res) => { 
    try {
        const pedido = await Pedidos.crearPedido(req, req.body)
        res.send(pedido);
        
    } catch (error) {
        console.log(error); 
        res.status(500).send('Hubo un error');
    }
};

exports.obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedidos.obtenerPedidos(req);
        res.json(pedidos)
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarPedido = async (req, res) => {
    try {
        const pedido = await Pedidos.actualizarPedido(req, req.params.id, req.body);
        res.json(pedido);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPedido = async (req, res) => {
    try {
        const pedido = await Pedidos.obtenerPedido(req, req.params.id);
        res.json(pedido);
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarPedido = async (req, res) => {
    try{
        const pedido = await Pedidos.eliminarPedido(req, req.params.id);
        res.status(200).json(pedido);
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
