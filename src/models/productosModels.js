const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const productoSchema = new Schema({
    nombre : {
        type: String,
        required: false
    },
    precio : {
        type : Number,
        required: false
    },
    cantidad_disponible : {
        type : Number,
        required: false
    },
    disponibilidad : {
        type : Boolean,
        required: false
    },
    descripcion : {
        type : Array,
        required: false
    },
    imagen : {
        type: String,
        required: false
    },
    imagen_min : {
        type: String,
        required: false
    },
},
{
    timestamps:true
});

module.exports = mongoose.model("productos", productoSchema);