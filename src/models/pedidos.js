const { v4: uuidv4 } = require('uuid');
const Token = require('./token')
const Cliente = require("../database/clienteModel"); // clienteModels
const Pedido = require("../database/pedidosModel"); // pedidosModels
const Etiqueta = require("../database/etiquetaModel"); // etiquetaModels


exports.crearPedido = async (autorizacion, pedidoData) => { 
    if(await Token(autorizacion, "administrador")){

        // Creamos nuestro pedido

        pedidoData[0].codigo_pedido = uuidv4();

        const pedido = Pedido(pedidoData[0]);

        const etiqueta = await new Etiqueta({
            name: pedido.pedido_etiqueta,
            color_etiqueta : "#000000",
            tipo : "pedido"
        });

        const id_cliente = pedidoData[1];

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

    } else {
        return 'Acceso denegado'
    }
};


exports.obtenerPedidos = async (autorizacion) => {
    if(await Token(autorizacion, "administrador")){
        const pedido = await Pedido.find().limit(20);
        
        return pedido
    
    } else {
        return 'Acceso denegado'
    }
}


exports.actualizarPedido = async (autorizacion, id, pedidoData) => {
    if(await Token(autorizacion, "administrador")){

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

    } else {
        return 'Acceso denegado'
    }
}

exports.obtenerPedido = async (autorizacion, id) => {
    if(await Token(autorizacion, "administrador")){

            const pedido = await Pedido.findById(id);

            if(!pedido) {
                return { msg: 'No existe el pedido' }
            }
        
            return pedido;
            

    } else {
        return 'Acceso denegado'
    }
}

exports.eliminarPedido = async (autorizacion, id) => {
    if(await Token(autorizacion, "administrador")){

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
            
    } else {
        return 'Acceso denegado'
    }
}
