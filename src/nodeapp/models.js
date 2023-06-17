const mongoose = require('./mongooseConection');

const usuario = mongoose.connection.model('usuario', {
    nombre : String,
    contraseña : String,
    sesiones : Array
});

const etiqueta = mongoose.connection.model('etiqueta',{
    nombre : String,
    color : String
})

const caja = mongoose.connection.model('caja', {
    nombre : String,
    materiales : Array
})

const material = mongoose.connection.model('material',{
    nombre : String,
    cantidad : Int32Array,
    precio : Int16Array,
    descripcion : Array,
    origen : String,
    etiquetas : Array,
    'estado reserva' : Boolean
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

module.exports = {usuario, etiqueta, caja, material, informe_costos, lista_de_compra};