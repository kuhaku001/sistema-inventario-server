const Etiquetas = require("../database/etiquetaModel");

exports.crearEtiqueta = async (etiquetaData) => { 
  
    const etiqueta = await Etiquetas(etiquetaData);

    await etiqueta.save();
    return etiqueta
            
}

exports.obtenerEtiquetas = async () => {

    const etiqueta = await Etiquetas.find()
    return etiqueta

}

exports.actualizarEtiqueta = async (id, etiquetaData) => {

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

}

exports.eliminarEtiqueta = async (id) => {

    let etiqueta = await Etiquetas.findById(id);

    if(!etiqueta) {
        return { msg: 'No existe la etiqueta' }
    }
    await Etiquetas.findOneAndRemove({_id:id})

    return ' etiqueta eliminada con  exito'
            
}

exports.obtenerEtiqueta = async (id) => {

    let etiqueta = await Etiquetas.findById(id);

    if(!etiqueta) {
        return { msg: 'No existe la etiqueta' }
    }
        
    return etiqueta

} 
