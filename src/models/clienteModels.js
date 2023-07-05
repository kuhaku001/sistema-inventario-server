const mongoose = require('mongoose');
const Schema= mongoose.Schema;
   
const clienteSchema = new Schema({
    nombre_cliente: {
        type: String,
        required: false
    },
    etiqueta_cliente: {
        type: String,
        required: false
    },
    descripcion: {
        type: String,
        required: false
    },
    pedidos: [{
        type: Schema.Types.ObjectId,
        ref:'pedidos'
    } ]  
},{
    timestamps:true

});



module.exports = mongoose.model('cliente', clienteSchema);