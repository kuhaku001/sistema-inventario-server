const clienteModels = require("../models/clienteModels");
const Token = require('./autentificarToken')
const { etiqueta } = require("../models/usuarioModels");



exports.crearCliente = async (req, res) => { 
    if(Token(req)){
        try {
            
            // Creamos nuestro material
            const cliente = clienteModels (req.body);

            await cliente.save();
            res.send(cliente);
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
};



exports.obtenerClientes = async (req, res) => {
    if(Token(req)){
        try {

            const cliente = await clienteModels.find().limit(20);
            res.json(cliente)
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}


exports.actualizarCliente = async (req, res) => {
    if(Token(req)){
        try {
            const { nombre_cliente,etiqueta_cliente,descripcion,pedidos } = req.body;
            let cliente =await clienteModels.findById(req.params.id);

            if(!cliente){
                res.status(404).json({msg:'no existe el material'})
            }
            cliente.nombre_cliente=nombre_cliente
            cliente.etiqueta_cliente=etiqueta_cliente
            cliente.descripcion=descripcion
            cliente.pedidos=pedidos

            cliente= await clienteModels.findOneAndUpdate({_id:req.params.id},cliente,{new:true})
            res.json(cliente);
            
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}


exports.obtenerCliente = async (req, res) => {
    if(Token(req)){
        try {
            let cliente = await clienteModels.findById(req.params.id);

            if(!cliente) {
                res.status(404).json({ msg: 'No existe el producto' })
            }
        
            res.json(cliente);
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.eliminarCliente = async (req, res) => {
    if(Token(req)){
        try {
            let cliente = await clienteModels.findById(req.params.id);

            if(!cliente) {
                res.status(404).json({ msg: 'No existe el producto' })
            }

            await clienteModels.findOneAndRemove({_id:req.params.id})
            res.json('material eliminado con  exito');
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}
