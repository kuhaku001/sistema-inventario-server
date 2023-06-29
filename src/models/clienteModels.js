const mongoose = require('mongoose');
   
const clienteSchema = mongoose.Schema({
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
    pedidos: {
        type: Array,
        required: false
    },
},{
    timestamps:true

});



module.exports = mongoose.model('cliente', clienteSchema);