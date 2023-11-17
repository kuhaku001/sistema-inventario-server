const Cliente = require("../models/clientes");

exports.crearCliente = async (req, res) => { 
    try {
        const cliente = await Cliente.crearCliente(req, req.body);
        res.send(cliente);
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.obtenerClientes(req);
        res.json(clientes)
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarCliente = async (req, res) => { 
    try {   
        const cliente = await Cliente.actualizarCliente(res, req.params.id, res.body);
        res.json(cliente);
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.obtenerCliente = async (req, res) => {
    try {
        const cliente = await Cliente.obtenerCliente(req, req.params.id);
        res.json(cliente);
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarCliente = async (req, res) => {
    try {
        const cliente = await Cliente.eliminarCliente(req, req.params.id);
        res.json(cliente);
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
