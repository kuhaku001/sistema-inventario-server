const mongoose = require('mongoose');
const Schema= mongoose.Schema;
   
const cajaSchema = new Schema({


    id: {
        type:Number ,
        required: false
    },
    nombreCaja: {
        type: String,
        required: false
    },
    
    descripcionCaja: {
        type: String,
        required: false
    },


});



module.exports = mongoose.model('cajas', cajaSchema);