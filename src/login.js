const encryp = require('./encrypt');
const crud = require('./nodeapp/usuarioCRUD');

const register = async (nombre = "", contraseña = "", dispositvo = "") => {
    try {
        const passwordHash = await encryp.encriptar(contraseña); 
        crud.crearUsuario(nombre, passwordHash, dispositvo);
    } catch (e) {
        console.log(e)
    }
}

const login = async (nombre = "", textoplano = "") => {

    const data = await crud.buscarUsuario(nombre)

    try {
        if(encryp.comparar(textoplano, data.contraseña)){
            console.log("Puedes entrar");                   // cambiar 
        }
    } catch {
        console.log("No puedes entrar");                    // cambiar
    }
}

