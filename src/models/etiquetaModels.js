const mongoose = require('mongoose');

const etiquetaSchema = mongoose.Schema({ 
    name:String,
    color_etiqueta:String,
    tipo:String,
})

module.exports = mongoose.model('Etiquetas', etiquetaSchema);
