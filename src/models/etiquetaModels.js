const mongoose = require('mongoose');

const etiquetaSchema = mongoose.Schema({ 
    name:String,
    color_etiqueta:String
})

module.exports = mongoose.model('ETIQUETAS', etiquetaSchema);


"borrar  esto"