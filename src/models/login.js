const encryp = require('../libs/encrypt');
const Usuario = require('./usuario');

exports.loginAdmin = async (nombre, textoplano) => {

    const data = await Usuario.buscarUsuario(nombre)
    console.log(data)
    try {
        if( await encryp.comparar(textoplano, data.contraseña) && data.rol !== undefined  && data.rol == "administrador"){
            return [true, data]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

exports.loginUsuario = async (nombre, textoplano) => {

    const data = await Usuario.buscarUsuario(nombre)
    
    try {
        if( await encryp.comparar(textoplano, data.contraseña) && data.rol !== undefined  && data.rol == "usuario"){
            return [true, data]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}
