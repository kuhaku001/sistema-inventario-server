const mongoose = require('./mongooseConection');


const usuario = mongoose.connection.model('usuario', {
    nombre : {
        type : String,
        required: true
    },
    contraseña : {
        type : String,
        required: true
    },
    datos_entrega : {
        type : Object,
        numero_telefonico : {
            type : String,
            required: true
        },
        nombre_real : {
            type : String,
            required: true
        },
        direccion : {
            type : String,
            required: true
        },
        codigo_postal : {
            type : Number,
            required: true
        },
        rut : {
            type : String,
            required: true
        },
    },
    rol : {
        type : String,
        required: true
    },
    pedidos : {
        type : Array,
        required: false
    },
});

/*
const caja = mongoose.connection.model('caja', {
    nombre : String,
    materiales : Array
})

const lista_de_compra = mongoose.connection.model('lista de compra', {
    fecha : Date,
    'lista de items' : Array
})
*/
module.exports = usuario // caja,  informe_costos, lista_de_compra};
