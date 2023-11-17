const Etiquetas = require('../models/etiquetas')

exports.crearEtiqueta = async (req, res) => { 
    try {   
        const etiqueta = Etiquetas.crearEtiqueta(req, req.body);
        res.send(etiqueta);
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerEtiquetas = async (req, res) => {
    try {
        const etiqueta = await Etiquetas.obtenerEtiquetas(req)
        res.json(etiqueta)
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    } 
}

exports.actualizarEtiqueta = async (req, res) => {
    try {
        const etiqueta = await Etiquetas.actualizarEtiqueta(req, req.params.id, req.body);
        res.json(etiqueta)
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarEtiqueta = async (req, res) => {
    try {
        const etiqueta = await Etiquetas.eliminarEtiqueta(req, req.params.id);
        res.json(etiqueta);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerEtiqueta = async (req, res) => {
    try {
        const etiqueta = await Etiquetas.obtenerEtiqueta(req, req.params.id)
        
        res.json(etiqueta);
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

} 
