const encryp = require('./encrypt');
const crud = require('../controller/usuarioController');

const registro = async (nombre, contraseña, dispositvo) => {
    try {
        const passwordHash = await encryp.encriptar(contraseña); 
        
        return await crud.crearUsuario(nombre, passwordHash, dispositvo);

    } catch (e) {
        console.log(e)
    }
}

const login = async (nombre, textoplano) => {

    const data = await crud.buscarUsuario(nombre)
    
    try {
        if( await encryp.comparar(textoplano, data.contraseña)){
            return [true, data]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {login, registro}