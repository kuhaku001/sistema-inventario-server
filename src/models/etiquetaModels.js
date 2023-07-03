const mongoose = require('mongoose');

const etiquetaSchema = mongoose.Schema({ 
    name:String,
    color_etiqueta:String
    
})

module.exports = mongoose.model('etiquetas', etiquetaSchema);