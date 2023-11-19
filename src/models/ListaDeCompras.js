const Lista = require("../database/ListaCompraModels");
const Token = require('./token')

exports.crearLista = async (autorizacion, listaData) => { 
    if(await Token(autorizacion, "administrador")){

        const lista = Material(listaData);
    
        await lista.save();

        return lista
    } else {
        return 'Acceso denegado'
    }
}

exports.actualizarListas = async (autorizacion, id, listaData) => {
    if(await Token(autorizacion, "administrador")){

        const {nombre_lista, ListaItems} = listaData;
            
        var lista = await Lista.findById(id);

        if(!lista){
            return {msg:'no existe el material'};
        }
        lista.nombre_lista = nombre_lista
        lista.ListaItems = ListaItems
        

        lista = await Lista.findOneAndUpdate({ _id:id }, lista, { new:true })
        
        return lista
        
    } else {
        return 'Acceso denegado'
    }
}

exports.obtenerLista = async (autorizacion, id) => {
    if(await Token(autorizacion, "administrador")){

        let lista = await Lista.findById(id);

        if(!lista) {
           return { msg: 'No existe el material' }
         }
        
        return lista

    } else {
        return 'Acceso denegado'
    }
} 

exports.eliminarLista = async (autorizacion, id) => {
    if(await Token(autorizacion, "administrador")){

        let lista = await Lista.findById(id);

        if(!lista) {
            return { msg: 'No existe el material' }
        }

        await Lista.findOneAndRemove({_id:id})

        return('lista eliminada con  exito');  

    } else {
        return('Acceso denegado');
    }
    
}


exports.obtenerListas = async (autorizacion) => {
    if(await Token(autorizacion, "administrador")){

        const lista = await Lista.find()
        return lista

    } else {
        return 'Acceso denegado'
    }
}