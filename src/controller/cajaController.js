const Caja = require("../models/cajas");
const Token = require('../models/token')

exports.crearCajas = async (req, res) => { 

    try {
        if(await Token(req, "administrador")){
            const caja = Caja.crearCaja(req.body);
            res.send(caja);
        } else {
            return 'Acceso denegado'
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}

exports.actualizarCaja = async (req, res) => {

    try {
        if(await Token(req, "administrador")){
            const caja =await Caja.actualizarCajas(req.params.id, req.body);
            res.json(caja);
        } else {
            return 'Acceso denegado'
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerCaja = async (req, res) => {

    try {
        if(await Token(req, "administrador")){
            const caja = await Caja.obtenerCaja(req.params.id);
            res.json(caja);
        } else {
            return 'Acceso denegado'
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 


exports.eliminarCaja = async (req, res) => {

    try {
        if(await Token(req, "administrador")){
            const caja = await Caja.eliminarCaja(req.params.id);
            res.json(caja);
        } else {
            return 'Acceso denegado'
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCajas = async (req, res) => {

    try {
        if(await Token(req, "administrador")){
            const caja = await Caja.obtenerCajas();
            res.json(caja);
        } else {
            return 'Acceso denegado'
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
