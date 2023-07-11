const mongoose = require('../database/mongooseConection');


const usuario = mongoose.connection.model('usuario', {
    nombre : String,
    contraseña : String,
    sesiones : Array
});


const caja = mongoose.connection.model('caja', {
    nombre : String,
    materiales : Array
})


const informe_costos = mongoose.connection.model('informe de costos', {
    costos : Array,
    'fecha informe inicio' : Date,
    'fecha informe final' : Date
})

const lista_de_compra = mongoose.connection.model('lista de compra', {
    fecha : Date,
    'lista de items' : Array
})

module.exports = {usuario,  caja,  informe_costos, lista_de_compra};


