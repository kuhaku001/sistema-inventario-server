const mongoose = require('./mongooseConection');

const usuario = mongoose.connection.model('usuario', {
    nombre : String,
    contraseña : String,
    sesiones : Array
});

module.exports = usuario;