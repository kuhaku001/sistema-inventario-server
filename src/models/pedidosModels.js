const mongoose = require('mongoose');

const Schema= mongoose.Schema;
   
const pedidosSchema = new Schema({

    codigo_pedido:{
        type:String,
        required: true
    },

    pedido_detalles:{
        type:String,
        required: false
    },

    pedido_etiqueta:{
        type:String,
        required: false
    },
    
    pruebas_calce:{
        type: Array,        // {
        require: false      //  anotacion: String (notRequire) , fecha: Date(el usaurio la puede meter manualmente, defaut: hoy)
    },                      // }

    pedido_precio:{
        type: Number,
        require: false
    },

    abono:{
        type: Number,
        require: false
    },

    materiales:{
        type:Array,
        required: false,
    },
    completado: {
        type: Boolean,
        require: true
    }
})


module.exports = mongoose.model('pedidos', pedidosSchema);