const userModel = require('./models'); 

const crearUsuario = async(nombreUsuario, contraseña, dispositivo) => {
    const user = new userModel.usuario({
        nombre: nombreUsuario,
        contraseña: contraseña,
        sesiones: [{
            dispositivo: dispositivo,
            inico: true
        }]
    })
    await user.save()

}

const buscarUsuario = async (nombreUsuario) => {
    const user = await userModel.usuario.findOne({'nombre' : nombreUsuario})

    const savedUsuario = await user.save();

    return savedUsuario;
}

const eliminarUsuario = async (nombreUsuario) => {
    const user = await userModel.usuario.deleteOne({'nombre' : nombreUsuario})
}

module.exports = {crearUsuario, buscarUsuario, eliminarUsuario};
