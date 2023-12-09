const Reserva = require('../models/reservas')
const Token = require('../models/token')

exports.crearReserva  = async (req, res) => {

    try {
        if(await Token(req, "usuario")){

            const {id_usuario} = req.body

            console.log(req.body)
 
            const reserva = await Reserva.crearReserva(id_usuario, req.body)
            res.status(200).send(reserva)
        } else {
            res.send('Acceso denegado')
        }
        
    } catch (error) {
        res.status(401).send('No tienes un token valido')
    }
};