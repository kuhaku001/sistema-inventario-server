const Cliente = require("../models/clientes");
const Token = require('./models/token')

exports.crearCliente = async (req, res) => { 
    try {
        if(await Token(req, "administrador")){
            const cliente = await Cliente.crearCliente(req.body);
            res.send(cliente);

        } else {
            return 'Acceso denegado'
        }
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.obtenerClientes = async (req, res) => {
    try {
        if(await Token(req, "administrador")){
            const clientes = await Cliente.obtenerClientes();
            res.json(clientes)
        
        } else {
            return 'Acceso denegado'
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarCliente = async (req, res) => { 
    try {   
        if(await Token(req, "administrador")){
            const cliente = await Cliente.actualizarCliente(req.params.id, res.body);
            res.json(cliente);
        } else {
            return 'Acceso denegado'
        }  
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.obtenerCliente = async (req, res) => {
    try {
        if(await Token(req, "administrador")){
            const cliente = await Cliente.obtenerCliente( req.params.id);
            res.json(cliente);
        } else {
            return 'Acceso denegado'
        }  
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarCliente = async (req, res) => {
    try {
        if(await Token(req, "administrador")){
            const cliente = await Cliente.eliminarCliente(req.params.id);
            res.json(cliente);
        } else {
            return 'Acceso denegado'
        }    
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
