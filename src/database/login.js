const encryp = require('./encrypt');
const crud = require('./usuarioCRUD');

const registro = async (nombre, contraseña, dispositvo) => {
    try {
        const passwordHash = await encryp.encriptar(contraseña); 
        await crud.crearUsuario(nombre, passwordHash, dispositvo);

    } catch (e) {
        console.log(e)
    }
}

const login = async (nombre, textoplano) => {

    const data = await crud.buscarUsuario(nombre)

    try {
        if( await encryp.comparar(textoplano, data.contraseña)){
            console.log("Puedes entrar");                               // cambiar 
        } else {
            console.log("No puedes entrar");
        }
    } catch(e) {
        console.log(e);                                                 // cambiar
    }
}

module.exports = {login, registro}