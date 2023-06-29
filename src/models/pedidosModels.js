const mongoose = require('mongoose');
   
const pedidosSchema = mongoose.Schema({

    codigo_pedido:{
        type:Number,
        required: false
    },
    materiales:{
        type:Array,
        required: false
    },
    materiales_nombre:{
        type:String,
        required: false
    },
    materiales_cantidad:{
        type:Number,
        required: false
    },
    pedido_descripcion:{
        type:String,
        required: false
    },
    Pedido_etiqueta:{
        type:String,
        required: false
    },
    


})


module.exports = mongoose.model('pedidos', pedidosSchema);