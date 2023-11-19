const mongoose = require('mongoose');

const MaterialesSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: false
    },
    precio: {
        type: Number,
        required: false
    },
    descripcion: {
        type: String,
        required: false
    },
    origen:{
        type: String,
        required: false
        
    },
    etiquetas:{
        type: Array,
        default: [[]],
        required: false, 
    },

    estado:{
        type:Boolean,
        required: true, 
        default: false,
    },

},{
    timestamps:true

});

module.exports = mongoose.model('Materiales', MaterialesSchema);