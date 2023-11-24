const Lista = require("../database/ListaCompraModels");

exports.crearLista = async (listaData) => { 

    const lista = Lista(listaData);
    
    await lista.save();

    return lista

}

exports.actualizarListas = async (id, listaData) => {
    const {nombre_lista, ListaItems} = listaData;
            
    var lista = await Lista.findById(id);

    if(!lista){
        return {msg:'no existe el material'};
    }
    lista.nombre_lista = nombre_lista
    lista.ListaItems = ListaItems
        

    lista = await Lista.findOneAndUpdate({ _id:id }, lista, { new:true })
        
    return lista
        
}

exports.obtenerLista = async (id) => {

    let lista = await Lista.findById(id);

    if(!lista) {
        return { msg: 'No existe el material' }
    }
        
    return lista

} 

exports.eliminarLista = async (id) => {

    let lista = await Lista.findById(id);

    if(!lista) {
        return { msg: 'No existe el material' }
    }

    await Lista.findOneAndRemove({_id:id})

    return('lista eliminada con  exito');  
    
}


exports.obtenerListas = async () => {

    const lista = await Lista.find()
    return lista

}