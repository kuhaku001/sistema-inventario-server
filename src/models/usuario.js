const jws = require('jsonwebtoken')
const encryp = require('../libs/encrypt');
const login = require('./login')
const Usuario = require('../database/usuarioModel')

exports.crearUsuario = async (usuarioData) => {

    const {name, password} = usuarioData;

    const usuarioNombre = await Usuario.findOne({nombre : name});

    if( await usuarioNombre){
        return 'Ya esta registrado ese nombre de usuario'
    }

    const contraseña = await encryp.encriptar(password)

    const user = new Usuario({
        nombre: name,
        contraseña: contraseña,
        datos_entrega: {},
        rol : "usuario",
        pedidos: []
    })
    await user.save()

    return 'Registrado'

}

exports.crearAdmin = async (nombreUsuario, contraseña, dispositivo) => {

    const password = await encryp.encriptar(contraseña)

    const user = new Usuario({
        nombre: nombreUsuario,
        contraseña: password,
        datos_entrega: {},
        rol : "administrador"
    })
    await user.save()

    return 'Registrado Admin'

}

exports.buscarUsuario = async (nombreUsuario, rol) => {
    try {
        const user = await Usuario.findOne({'nombre' : nombreUsuario, 'rol': rol})
    
        return user;
        
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
        const token = jws.sign(
            {
                _id : data[1]._id,
                exp : Date.now()
            }, 
            process.env.JSON_WEB_TOKEN_KEY
        ) 
        return {token}
        
    } else {
        return "Error de Login"
    };
};

exports.loginUsuario =  async (adminData) => {

    const {name, password} = adminData;
    const data = await login.loginUsuario(name, password)
    
    if( await data[0]){

        const token = jws.sign(
            {
                _id : data[1]._id,
                exp : Date.now()
            }, 
            process.env.JSON_WEB_TOKEN_KEY
        ) 
        return {token}

    } else {
        return "Error de Login"
    };

}
