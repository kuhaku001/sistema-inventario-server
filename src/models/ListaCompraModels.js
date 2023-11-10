const mongoose = require('mongoose');
const Schema= mongoose.Schema;
   
const ListaCompraSchema = new Schema({



    id: {
        type:Number ,
        required: false
    },

    nombre_lista: {
        type:String ,
        required: false
    },
    FechaLista: {
        type: String,
        required: false
    },
    
    ListaItems: {
        type: Array,
        required: false
    },


});



module.exports = mongoose.model('listaCompra', ListaCompraSchema);