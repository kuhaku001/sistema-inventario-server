const Etiquetas = require('../models/etiquetas')
const Token = require('../models/token')

exports.crearEtiqueta = async (req, res) => { 
    try {  
        if(await Token(req, "administrador")){
 
            const etiqueta = Etiquetas.crearEtiqueta(req.body);
            res.send(etiqueta);
        
        } else {
            return 'Acceso denegado'
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerEtiquetas = async (req, res) => {
    try {
        if(await Token(req, "administrador")){
 
            const etiqueta = await Etiquetas.obtenerEtiquetas()
            res.json(etiqueta)
        } else {
            return 'Acceso denegado'
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    } 
}

exports.actualizarEtiqueta = async (req, res) => {
    try {
        if(await Token(req, "administrador")){
 
            const etiqueta = await Etiquetas.actualizarEtiqueta(req.params.id, req.body);
            res.json(etiqueta)
        } else {
            return 'Acceso denegado'
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarEtiqueta = async (req, res) => {
    try {
        if(await Token(req, "administrador")){
 
            const etiqueta = await Etiquetas.eliminarEtiqueta(req.params.id);
            res.json(etiqueta);
        } else {
            return 'Acceso denegado'
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerEtiqueta = async (req, res) => {
    try {
        if(await Token(req, "administrador")){
 
            const etiqueta = await Etiquetas.obtenerEtiqueta(req.params.id)
            res.json(etiqueta);
        } else {
            return 'Acceso denegado'
        }  
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

} 
