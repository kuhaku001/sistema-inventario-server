const jws = require('jsonwebtoken')

const login = require('./login')
const Usuario = require('../database/usuarioModel')

exports.crearUsuario = async (nombreUsuario, contraseña, dispositivo) => {
    const user = new Usuario({
        nombre: nombreUsuario,
        contraseña: contraseña,
        sesiones: [{
            dispositivo: dispositivo,
            inico: true
        }],
        rol : "usuario"
    })
    await user.save()

}

exports.crearAdmin = async (nombreUsuario, contraseña, dispositivo) => {
    const user = new Usuario({
        nombre: nombreUsuario,
        contraseña: contraseña,
        sesiones: [{
            dispositivo: dispositivo,
            inico: true
        }],
        rol : "administrador"
    })
    await user.save()

}

exports.buscarUsuario = async (nombreUsuario) => {
    try {
        const user = await Usuario.findOne({'nombre' : nombreUsuario})

        const savedUsuario = await user.save();
    
        return savedUsuario;
        
    } catch (error) {
        return false // verificar
    }

}

exports.buscarUsuarioID = async (idUsuario) => {
    try {
        const user = await Usuario.findOne({'_id' : idUsuario})

        if(user !== null && user !== undefined){
            return true
        } else{
            return false
        }

    } catch (error) {
        return false
    }

}

exports.buscarUsuarioRol = async (idUsuario, rolUsuario) => {
    try {
        const user = await Usuario.findOne({'_id' : idUsuario})

        if(user.rol !== null && user.rol !== undefined && user.rol === rolUsuario){
            return true
        } else{
            return false
        }
    } catch (error) {
        return false 
    }

}

exports.eliminarUsuario = async (nombreUsuario) => {
    try{
        const user = await Usuario.deleteOne({'nombre' : nombreUsuario})
        return user

    } catch (error) {
        return 'No se pudo eliminar el usuario'
    }
}

exports.loginAdmin = async (adminData) => {
    
    const {name, password} = adminData;
    const data = await login.loginAdmin(name, password)

    console.log(data[1])
    console.log(jws.sign({_id : data[1]._id}, process.env.JSON_WEB_TOKEN_KEY))

    if( await data[0]){
        const token = jws.sign({_id : data[1]._id}, process.env.JSON_WEB_TOKEN_KEY)
        return {token:token}

    } else {
        return "Error de Login"
    };
};

exports.loginUsuario =  async (adminData) => {

    const {name, password} = adminData.body;

    const data = await Usuario.loginUsuario(name, password)

    if( await data[0]){

        const token = jws.sign({_id : data[1]._id}, process.env.JSON_WEB_TOKEN_KEY) 
        return {token}

    } else {
        return "Error de Login "
    };

}

