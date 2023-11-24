const Cliente = require("../database/clienteModel");
const Etiqueta = require("../database/etiquetaModel");

exports.crearCliente = async (clienteData) => { 

    const cliente = new Cliente(clienteData);

    if(!cliente.etiqueta_cliente){
        const etiqueta = await new Etiqueta({
            name: cliente.nombre_cliente,
            color_etiqueta : "#000000",
            tipo : "cliente"
        });

        await etiqueta.save();

        cliente.etiqueta_cliente = await cliente.nombre_cliente
    } else {
        const etiqueta = await new Etiqueta({
            name: cliente.etiqueta_cliente,
            color_etiqueta : "#000000",
            tipo : "cliente"
        });
        await etiqueta.save();
    }

    await cliente.save();

    return cliente

};

exports.obtenerClientes = async () => {

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

}


exports.actualizarCliente = async (id, clienteData) => {
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

}

exports.obtenerCliente = async (id) => {

    var cliente = await Cliente.findById(id);

    if(!cliente) {
        return { msg: 'No existe el cliente' }
    }
    
    return cliente

}

exports.eliminarCliente = async (id) => {

    var cliente = await Cliente.findById(id);

    if(!cliente) {
        return { msg: 'No existe el cliente' }
    }

    await Etiqueta.findOneAndRemove({name: cliente.etiqueta_cliente})

    await Cliente.findOneAndRemove({_id : id})

    return 'cliente eliminado con  exito'
    //TODO: eliminar la etiqueta relacionada a los materiales
            

}