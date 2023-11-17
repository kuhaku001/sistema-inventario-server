const Token = require('./token')
const Etiquetas = require("../database/etiquetaModel");

exports.crearEtiqueta = async (autorizacion, etiquetaData) => { 
    if(await Token(autorizacion, "administrador")){
            
        const etiqueta = await Etiquetas(etiquetaData);

        await etiqueta.save();
        return etiqueta
            
    } else {
        return 'Acceso denegado'
    }
}

exports.obtenerEtiquetas = async (autorizacion) => {
    if(await Token(autorizacion, "administrador")){

        const etiqueta = await Etiquetas.find()
        return etiqueta

    } else {
        return 'Acceso denegado'
    }
}

exports.actualizarEtiqueta = async (autorizacion, id, etiquetaData) => {
    if(await Token(autorizacion, "administrador")){
        try {
            const { name,color_etiqueta } = etiquetaData;
            let etiqueta = await Etiquetas.findById(id);

            if(!etiqueta){
                return {msg:'no existe la etiqueta'}
            }
            etiqueta.name = name
            etiqueta.color_etiqueta = color_etiqueta
            etiqueta = await Etiquetas.findOneAndUpdate({_id : id},etiqueta,{new:true})
            
            return etiqueta;
            
        } catch (error) {
            console.log(error);
            return 'Hubo un error'
        }
    } else {
        return 'Acceso denegado'
    }
}

exports.eliminarEtiqueta = async (autorizacion, id) => {
    if(await Token(autorizacion, "administrador")){
        let etiqueta = await Etiquetas.findById(id);

        if(!etiqueta) {
            return { msg: 'No existe la etiqueta' }
        }
        await Etiquetas.findOneAndRemove({_id:id})

        return ' etiqueta eliminada con  exito'
            
    } else {
        return 'Acceso denegado'
    }
}

exports.obtenerEtiqueta = async (autorizacion, id) => {
    if(await Token(autorizacion, "administrador")){
        let etiqueta = await Etiquetas.findById(id);

        if(!etiqueta) {
            return { msg: 'No existe la etiqueta' }
        }
        
        return etiqueta
    } else {
        return 'Acceso denegado'
    }
} 
