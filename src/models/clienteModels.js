const mongoose = require('mongoose');
const Schema= mongoose.Schema;
   
const clienteSchema = new Schema({
    nombre_cliente: {
        type: String,
        required: false
    },
    telefono: {
        type: String,
        required: false
    },
    medidas: {
        type: Object,
        required: false,

        c_cuello : {
            type: Float32Array,
            required: false
        },
        c_busto : {
            type: Float32Array,
            required: false
        },
        c_cintura : {
            type: Float32Array,
            required: false
        },
        t_delantero : {
            type: Float32Array,
            required: false
        },
        t_espalda : {
            type: Float32Array,
            required: false
        },
        a_busto : {
            type: Float32Array,
            required: false
        },
        a_espalda : {
            type: Float32Array,
            required: false
        },
        sep_busto : {
            type: Float32Array,
            required: false
        },
        a_cadera : {
            type: Float32Array,
            required: false
        },
        alto_de_tipo : {
            type: Float32Array,
            required: false
        },
        alto_de_sisa : {
            type: Float32Array,
            required: false
        },
        largo_manga : {
            type: Float32Array,
            required: false
        },
        largo_pierna : {
            type: Float32Array,
            required: false
        },
        puño : {
            type: Float32Array,
            required: false
        },
        muñeca : {
            type: Float32Array,
            required: false
        },
        rodilla : {
            type: Float32Array,
            required: false
        },
        tobillo : {
            type: Float32Array,
            required: false
        },
        ancho_brazo : {
            type: Float32Array,
            required: false
        },
        otras_medidas : {
            type: String,
            required: false
        },
        toma_medidas : {
            type: Date,
            required: false
        }
    },
    etiqueta_cliente: {
        type: String,
        required: false
    },
    pedidos: {
        type: Array,
        required: false
    }
},{
    timestamps:true
});



module.exports = mongoose.model('cliente', clienteSchema);