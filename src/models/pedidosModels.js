const mongoose = require('mongoose');

const Schema= mongoose.Schema;
   
const pedidosSchema = new Schema({

    codigo_pedido:{
        type:Schema.Types.ObjectId,
        ref:'cliente',
        
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