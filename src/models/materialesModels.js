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
    etiquetaM:[{
        type:mongoose.Schema.Types.ObjectId,ref:'ETIQUETAS' 
        

    }],

    estado:{
        type:Boolean
    },
   
    

},{
    timestamps:true

});

module.exports = mongoose.model('Materiales', MaterialesSchema);