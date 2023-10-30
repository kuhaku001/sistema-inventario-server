const mongoose = require('../database/mongooseConection');

const producto = mongoose.connection.model('productos',{
    nombre : String,
    precio : Number,
    cantidad_disponible : Number,
    disponibilidad : Boolean,
    descripcion : Array,
    imagen : String,
    imagen_min : String,
},
{
    timestamps:true
});

module.exports = producto;