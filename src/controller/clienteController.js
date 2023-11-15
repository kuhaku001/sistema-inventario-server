const clienteModels = require("../models/clienteModels");
const Token = require('../libs/autentificarToken')
const etiquetaModels = require("../models/etiquetaModels");


exports.crearCliente = async (req, res) => { 
    if(await Token(req, "administrador")){
        try {
            
            const cliente = new clienteModels(req.body);

            const etiqueta = await  new etiquetaModels ({
                name: cliente.nombre_cliente + " - cliente",
                color_etiqueta : "#000000",
                tipo : "cliente"
            });

            await etiqueta.save();

            cliente.etiqueta_cliente = await cliente.nombre_cliente + " - cliente"
            

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
    if(await Token(req, "administrador")){
        try {

            const clientes = await clienteModels.aggregate([
                {
                    $lookup: {
                        from: "pedidos",
                        localField: "pedidos",
                        foreignField: "codigo_pedido",
                        as: "Pedidos"
                    }
                },
                {
                    $project: {
                        pedidos : 0,
                    }
                }
            ]).limit(20).sort({updatedAt: -1});

            console.log(clientes)

            res.json(clientes)
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.actualizarCliente = async (req, res) => { 
    
    if(await Token(req, "administrador")){
        try {
            const { 
                nombre_cliente,
                telefono,
                medidas
            } = req.body;
            let cliente =await clienteModels.findById(req.params.id);

            if(!cliente){
                res.status(404).json({msg:'no existe el cliente'})
            }
            cliente.nombre_cliente=nombre_cliente
            cliente.telefono=telefono
            cliente.medidas=medidas

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
    if(await Token(req, "administrador")){
        try {
            let cliente = await clienteModels.findById(req.params.id);

            if(!cliente) {
                res.status(404).json({ msg: 'No existe el cliente' })
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
    if(await Token(req, "administrador")){
        try {
            let cliente = await clienteModels.findById(req.params.id);

            if(!cliente) {
                res.status(404).json({ msg: 'No existe el cliente' })
            }
            // elimina la etiqueta relacionada al cliente
            await etiquetaModels.findOneAndRemove({name: cliente.etiqueta_cliente})

            await clienteModels.findOneAndRemove({_id:req.params.id})
            res.json('cliente eliminado con  exito');

            //TODO: eliminar la etiqueta relacionada a los materiales
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}
