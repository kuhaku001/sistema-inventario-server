const encryp = require('../libs/encrypt');
const Usuario = require('./usuario');

exports.loginAdmin = async (nombre, textoplano) => {

    const data = await Usuario.buscarUsuario(nombre, "administrador")
    
    if(!data){
        return false
    }

    try {
        if( await encryp.comparar(textoplano, data.contraseña) && data.rol !== undefined){
            return [true, data]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

exports.loginUsuario = async (nombre, textoplano) => {

    const data = await Usuario.buscarUsuario(nombre, "usuario")
    
    if(!data){
        return false
    }

    try {
        if( await encryp.comparar(textoplano, data.contraseña) && data.rol !== undefined){
            return [true, data]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}
