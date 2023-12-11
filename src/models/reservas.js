const { v4: uuidv4 } = require('uuid');

const Reserva = require('../database/reservasModel');
const Usuario = require('../database/usuarioModel')

exports.crearReserva = async (id_usuario, reservaData) => {

    const user = await Usuario.findById({'_id' : id_usuario})
    const datosDestinatario = await user.datos_entrega

    if(!user){
        return { msg: 'No existe el usuario' }
    }

    if(!datosDestinatario){
        return { msg: 'No existen datos de del destinatario' }
    }

    const codigo = await uuidv4();
    
    reservaData.codigo_reserva = codigo;
    reservaData.datos_de_destinatario = user.datos_entrega;

    delete reservaData.id_usuario;

    const reserva = await new Reserva(reservaData)

    await Usuario.updateOne(
        {_id : user._id},
        {
            $addToSet : {
                "pedidos" : codigo
            }
        }
    )

    await reserva.save();

    return reserva;
}

exports.verReservas = async () => {
    const reserva = await Reserva.find()
    return reserva;
}
