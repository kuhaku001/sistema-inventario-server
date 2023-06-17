const userModel = require('./models'); 
const mongoose = require('./mongooseConection');

const crearUsuario = async(nombreUsuario, contraseña, dispositivo = '') => {
    const user = userModel({
        nombre: nombreUsuario,
        contraseña: contraseña,
        sesiones: [{
            dispositivo: dispositivo,
            inico: true
        }]
    })
    const savedUsuario = await user.save()

    mongoose.disconnect()
}

const buscarUsuario = async (nombreUsuario) => {
    const user = await userModel.findOne({'nombre' : nombreUsuario})

        const usuario = user.nombre
        const contraseña = user.contraseña

    const savedUsuario = await user.save()

    mongoose.disconnect()

    return savedUsuario
}

const eliminarUsuario = async (nombreUsuario) => {
    const user = await userModel.deleteOne({'nombre' : nombreUsuario})

    const savedUsuario = await user.save()

    mongoose.disconnect()
}

module.exports = {crearUsuario, buscarUsuario, eliminarUsuario};

//buscarUsuario('Camila Carcamo Caucaman')