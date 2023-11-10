const clienteModels = require("../models/clienteModels");
const pedidosModels = require("../models/pedidosModels");
const Token = require('./autentificarToken')

exports.crearPedido = async (req, res) => { 
    if(Token(req)){
        try {
          
            console.log(req.body[0])
            console.log(req.body[1])

            // Creamos nuestro pedido

            req.body[0].codigo_pedido = 10002;

            const pedido = pedidosModels(req.body[0]);

            const id_cliente = req.body[1];

            await pedido.save();

            const cliente = await clienteModels.findOneAndUpdate(
                {_id : id_cliente},
                {
                    $addToSet : {
                        "pedidos" : pedido.codigo_pedido
                    }
                }
            )
            
            console.log(cliente)

            res.send(pedido);
        
        } catch (error) {
            console.log(error); 
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
};


exports.obtenerPedidos = async (req, res) => {
    if(Token(req)){
        try {

            const pedido = await pedidosModels.find().limit(20);
            res.json(pedido)
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}


exports.actualizarPedido = async (req, res) => {
    if(Token(req)){
        try {
            const { codigo_pedido,materiales,materiales_nombre,materiales_cantidad,pedido_descripcion,pedido_etiqueta } = req.body;
            let pedido =await pedidosModels.findById(req.params.id);

            if(!pedido){
                res.status(404).json({msg:'no existe el material'})
            }
            pedido.codigo_pedido=codigo_pedido
            pedido.materiales=materiales
            pedido.materiales_nombre=materiales_nombre
            pedido.materiales_cantidad=materiales_cantidad
            pedido.pedido_descripcion=pedido_descripcion
            pedido.pedido_etiqueta=pedido_etiqueta

            pedido= await pedidosModels.findOneAndUpdate({_id:req.params.id},pedido,{new:true})
            res.json(pedido);
            
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.obtenerPedido = async (req, res) => {
    if(Token(req)){
        try {
            let pedido = await pedidosModels.findById(req.params.id);

            if(!pedido) {
                res.status(404).json({ msg: 'No existe el producto' })
            }
        
            res.json(pedido);
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.eliminarPedido = async (req, res) => {
    if(Token(req)){
        try{
            const pedido = await pedidosModels.findById(req.params.id);
            const codigo = pedido.codigo_pedido

            if(!pedido) {
                res.status(404).json({ msg: 'No existe el pedido' })
            }

            var cliente = await clienteModels.findOneAndUpdate(
                {
                    "pedidos" : pedido.codigo_pedido
                },
                {
                    $pull : {"pedidos" : codigo}
                }
            )

            await pedidosModels.deleteOne({_id:req.params.id})

            res.status(200).json({
                "id_cliente" : cliente._id,
                "id_pedido": pedido._id
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}
