const mongoose = require('./mongooseConection');

const reserva = mongoose.connection.model('reserva', {
    codigo_reserva : {
        type : String,
        required: false
    },
    datos_de_destinatario : {
        type : Object,
        numero_telefonico : {
            type : String,
            required: false
        },
        nombre_real : {
            type : String,
            required: false
        },
        direccion : {
            type : String,
            required: false
        },
        codigo_postal : {
            type : Number,
            required: false
        },
        rut : {
            type : String,
            required: false
        },
        required:false
    },
    precio : {
        type : Number,
        required: false
    },
    productos : {
        type : Array,
        required:false
    },
    estado_entrega : {
        type : Boolean,
        required: false
    },
    estado_pago : {
        type : Boolean,
        required: false
    },

});

module.exports = reserva;