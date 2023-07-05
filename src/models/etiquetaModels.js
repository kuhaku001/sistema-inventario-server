const mongoose = require('mongoose');

const etiquetaSchema = mongoose.Schema({ 

    
    nombre:String,
    color:String,
    etiquetasR:{
        type:mongoose.Schema.Types.ObjectId,ref:"Materiales"
    },
   
        



    
})

module.exports = mongoose.model('ETIQUETAS', etiquetaSchema);


"borrar  esto"