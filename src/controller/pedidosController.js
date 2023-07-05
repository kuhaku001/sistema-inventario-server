const clienteModels = require("../models/clienteModels");
const pedidosModels = require("../models/pedidosModels");




exports.crearPedido = async (req, res) => { 
        
    try {
           
        // Creamos nuestro material
        const pedido = pedidosModels(req.body);

        await pedido.save();
        res.send(pedido);
        
    } catch (error) {
        console.log(error); 
        res.status(500).send('Hubo un error');
    }

};


exports.obtenerPedidos = async (req, res) => {

    try {

        const pedido = await pedidosModels.find().limit(20);
        res.json(pedido)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}


exports.actualizarPedido = async (req, res) => {

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
}

exports.obtenerPedido = async (req, res) => {

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
}

exports.eliminarPedido = async (req, res) => {

    try {
        let pedido = await pedidosModels.findById(req.params.id);

        if(!pedido) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        await pedidosModels.findOneAndRemove({_id:req.params.id})
        res.json('material eliminado con  exito');
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.agregarPedidoCliente = async (req ,res) => { 
    try {
           
        const nuevoPedido = pedidosModels(req.body);
        const cliente= await clienteModels.findById(req.params.id);
        nuevoPedido.codigo_pedido=cliente
        await nuevoPedido.save();
        cliente.pedidos.push(nuevoPedido)
        await cliente.save();
        res.send(nuevoPedido);
        console.log(cliente)
        
        
        //res.send(nuevoPedido);
        
    } catch (error) {
        console.log(error); 
        res.status(500).send('Hubo un error');
        
    }

};




exports.MostrarDatosPedidos = async (req ,res) => {
    //buscar  ususario  y  poblar  el  arreglo  de peididos  del  cliente
    const cliente = await clienteModels.findById(req.params.id).populate('pedidos')
    res.send(cliente)
 }