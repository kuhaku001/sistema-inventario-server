const Caja = require("../database/cajaModels");
const Token = require('./token')

exports.crearCaja = async (autorizacion, cajaData) => { 
    if(await Token(autorizacion, "administrador")){

        const caja = Caja(cajaData);
    
        await caja.save();

        return caja
    } else {
        return 'Acceso denegado'
    }
}

exports.actualizarCajas = async (autorizacion, id, cajaData) => {
    if(await Token(autorizacion, "administrador")){

        const {nombreCaja,descripcionCaja} = cajaData;
            
        var caja = await Caja.findById(id);

        if(!caja){
            return {msg:'no existe el material'};
        }
        caja.nombreCaja = nombreCaja
        caja.descripcionCaja = descripcionCaja
        

        caja = await Caja.findOneAndUpdate({ _id:id }, caja, { new:true })
        
        return caja
        
    } else {
        return 'Acceso denegado'
    }
}

exports.obtenerCaja = async (autorizacion, id) => {
    if(await Token(autorizacion, "administrador")){

        let caja = await Caja.findById(id);

        if(!caja) {
           return { msg: 'No existe el material' }
         }
        
        return caja

    } else {
        return 'Acceso denegado'
    }
} 

exports.eliminarCaja = async (autorizacion, id) => {
    if(await Token(autorizacion, "administrador")){

        let caja = await Caja.findById(id);

        if(!caja) {
            return { msg: 'No existe el material' }
        }

        await Caja.findOneAndRemove({_id:id})

        return('lista eliminada con  exito');  

    } else {
        return('Acceso denegado');
    }
    
}


exports.obtenerCajas = async (autorizacion) => {
    if(await Token(autorizacion, "administrador")){

        const caja = await Caja.find()
        return caja

    } else {
        return 'Acceso denegado'
    }
}