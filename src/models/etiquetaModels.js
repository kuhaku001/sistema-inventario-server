const mongoose = require('mongoose');

const etiquetaSchema = mongoose.Schema({ 

    
    name:String,
    color_etiqueta:String,
    etiquetasR:{
        type:mongoose.Schema.Types.ObjectId,ref:"Materiales"
    },
    
})

module.exports = mongoose.model('ETIQUETAS', etiquetaSchema);


"borrar  esto"