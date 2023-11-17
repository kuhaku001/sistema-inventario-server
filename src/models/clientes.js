const Token = require('./token')
const Cliente = require("../database/clienteModel");
const Etiqueta = require("../database/etiquetaModel");

exports.crearCliente = async (autorizacion, clienteData) => { 
    if(await Token(autorizacion, "administrador")){

            const cliente = new Cliente(clienteData);

            const etiqueta = await new Etiqueta({
                name: cliente.nombre_cliente,
                color_etiqueta : "#000000",
                tipo : "cliente"
            });
            await etiqueta.save();

            cliente.etiqueta_cliente = await cliente.nombre_cliente
            await cliente.save();

            return cliente

    } else {
        return 'Acceso denegado'
    }
};

exports.obtenerClientes = async (autorizacion) => {
    if(await Token(autorizacion, "administrador")){

        const clientes = await Cliente.aggregate([
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

        return clientes

    } else {
        return 'Acceso denegado'
    }
}


exports.actualizarCliente = async (autorizacion, id, clienteData) => {
    if(await Token(autorizacion, "administrador")){
        const { 
            nombre_cliente,
            telefono,
            medidas
        } = clienteData;

        var cliente = await clienteModels.findById(id);

        if(!cliente){
            return {msg:'no existe el cliente'}
        }

        cliente.nombre_cliente=nombre_cliente
        cliente.telefono=telefono
        cliente.medidas=medidas

        cliente = await clienteModels.findOneAndUpdate({_id : id}, cliente, { new:true })
        
        return cliente

    } else {
        return 'Acceso denegado'
    }
}

exports.obtenerCliente = async (autorizacion, id) => {
    if(await Token(autorizacion, "administrador")){

        var cliente = await Cliente.findById(id);

        if(!cliente) {
            return { msg: 'No existe el cliente' }
        }
    
        return cliente

    } else {
        return 'Acceso denegado'
    }
}

exports.eliminarCliente = async (autorizacion, id) => {
    if(await Token(autorizacion, "administrador")){

        var cliente = await Cliente.findById(id);

        if(!cliente) {
            return { msg: 'No existe el cliente' }
        }

        await Etiqueta.findOneAndRemove({name: cliente.etiqueta_cliente})

        await Cliente.findOneAndRemove({_id : id})

        return 'cliente eliminado con  exito'
        //TODO: eliminar la etiqueta relacionada a los materiales
            
    } else {
        return 'Acceso denegado'
    }
}