const mongoose = require('mongoose');

const etiquetaSchema = mongoose.Schema({ 
    nombre:String,
    color:String
    
})

module.exports = mongoose.model('etiquetas', etiquetaSchema);


"borrar  esto"