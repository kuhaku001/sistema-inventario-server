const mongoose = require('mongoose');

const MaterialesSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: false
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
        type: Array,
        required: false
    },
    origen:{
        type: String,
        required: false
        
    },
    etiquetas:{
        type:Array,
        required:false
    }

});

module.exports = mongoose.model('Materiales', MaterialesSchema);