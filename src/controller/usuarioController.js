const userModel = require('../models/usuarioModels'); 

const crearUsuario = async (nombreUsuario, contraseña, dispositivo) => {
    const user = new userModel.usuario({
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

const crearAdmin = async (nombreUsuario, contraseña, dispositivo) => {
    const user = new userModel.usuario({
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

const buscarUsuario = async (nombreUsuario) => {
    try {
        const user = await userModel.usuario.findOne({'nombre' : nombreUsuario})

        const savedUsuario = await user.save();
    
        return await savedUsuario;
        
    } catch (error) {
        return false // verificar
    }

}

const buscarUsuarioID = async (idUsuario) => {
    try {
        const user = await userModel.usuario.findOne({'_id' : idUsuario})

        if(user !== null && user !== undefined){
            return true
        } else{
            return false
        }
    } catch (error) {
        return false // verificar
    }

}

const buscarUsuarioRol = async (idUsuario, rolUsuario) => {
    try {
        const user = await userModel.usuario.findOne({'_id' : idUsuario})

        if(user.rol !== null && user.rol !== undefined && user.rol === rolUsuario){
            return true
        } else{
            return false
        }
    } catch (error) {
        return false // verificar
    }

}


const eliminarUsuario = async (nombreUsuario) => {
    const user = await userModel.usuario.deleteOne({'nombre' : nombreUsuario})
}

module.exports = {crearUsuario, buscarUsuario, eliminarUsuario, buscarUsuarioID, buscarUsuarioRol };
