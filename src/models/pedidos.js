const { v4: uuidv4 } = require('uuid');

const Cliente = require("../database/clienteModel"); // clienteModels
const Pedido = require("../database/pedidosModel"); // pedidosModels
const Etiqueta = require("../database/etiquetaModel"); // etiquetaModels


exports.crearPedido = async (pedidoData) => { 

    // Creamos nuestro pedido

    pedidoData[0].codigo_pedido = uuidv4();

    const pedido = Pedido(pedidoData[0]);

    const etiqueta = await new Etiqueta({
        name: pedido.pedido_etiqueta,
        color_etiqueta : "#000000",
        tipo : "pedido"
    });

    const id_cliente = await pedidoData[1];

    await pedido.save();
    await etiqueta.save();

    await Cliente.findOneAndUpdate(
        {_id : id_cliente},
        {
            $addToSet : {
                "pedidos" : pedido.codigo_pedido
            }
        }
    )

    return pedido;

};


exports.obtenerPedidos = async () => {

    const pedido = await Pedido.find();
    return pedido

}


exports.actualizarPedido = async (id, pedidoData) => {

    const {
        codigo_pedido,
        pedido_detalles,
        pedido_etiqueta,
        pedido_precio,
        abono,
        completado,
    } = pedidoData;

    let pedido = await Pedido.findById(id);

    if(!pedido){
        return { msg: 'No existe el pedido' }
    }

    pedido.codigo_pedido = codigo_pedido
    pedido.pedido_detalles = pedido_detalles
    pedido.pedido_etiqueta = pedido_etiqueta
    pedido.pedido_precio = pedido_precio
    pedido.abono = abono
    pedido.completado = completado

    pedido = await Pedido.findOneAndUpdate({_id:id},pedido,{new:true})
            
    return pedido

}

exports.agregarPruebaCalce = async (id, pedidoData) => {

    let pedido = await Pedido.findById(id);

    if(!pedido){
        return { msg: 'No existe el pedido' }
    }

    pedidoData.fecha = new Date(pedidoData.fecha)

    pedido = await Pedido.findOneAndUpdate(
        {
            _id:id
        },
        {
            $push: {
                pruebas_calce : pedidoData
            }
        },{
            new:true
        }
    )
            
    return pedido

}

exports.actualizarPedidoCalce = async (id, pedidoData) => {

    let pedido = await Pedido.findById(id);

    if(!pedido){
        return { msg: 'No existe el pedido' }
    }

    pedido.pruebas_calce = pedidoData

    console.log(pedido)

    const pedidoCalce = await Pedido.replaceOne(
        {
            _id : id
        },
        pedido
    )
            
    return pedidoCalce

}

exports.obtenerPedido = async (id) => {

    const pedido = await Pedido.findById(id);

    if(!pedido) {
        return { msg: 'No existe el pedido' }
    }
        
    return pedido;

}

exports.eliminarPedido = async (id) => {

    const pedido = await Pedido.findById(id);
    const codigo = pedido.codigo_pedido

    if(!pedido) {
        return { msg: 'No existe el pedido' }
    }

    await Etiqueta.findOneAndRemove({name: pedido.pedido_etiqueta})
    
    var cliente = await Cliente.findOneAndUpdate(
        {
            "pedidos" : pedido.codigo_pedido
        },
        {
            $pull : {"pedidos" : codigo}
        }
    )

    await Pedido.deleteOne({_id:id})

    return {
        "id_cliente" : cliente._id,
        "id_pedido": pedido._id
    }

}


exports.actualizarCalce= async (id, pedidoData) => {

}