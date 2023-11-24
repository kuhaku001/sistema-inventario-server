const Caja = require("../database/cajaModels");

exports.crearCaja = async (cajaData) => { 
        
    const caja = Caja(cajaData);
    await caja.save();
    return caja

}

exports.actualizarCajas = async (id, cajaData) => {
    
    const {nombreCaja,descripcionCaja} = cajaData;
            
    var caja = await Caja.findById(id);

    if(!caja){
        return {msg:'no existe el material'};
    }
    caja.nombreCaja = nombreCaja
    caja.descripcionCaja = descripcionCaja
        
    caja = await Caja.findOneAndUpdate({ _id:id }, caja, { new:true })
        
    return caja

}

exports.obtenerCaja = async (id) => {

    let caja = await Caja.findById(id);

    if(!caja) {
        return { msg: 'No existe el material' }
    }
    
    return caja

} 

exports.eliminarCaja = async ( id) => {

    let caja = await Caja.findById(id);

    if(!caja) {
        return { msg: 'No existe el material' }
    }

    await Caja.findOneAndRemove({_id:id})

    return('lista eliminada con  exito');  

    
}


exports.obtenerCajas = async () => {

    const caja = await Caja.find()
    return caja

}