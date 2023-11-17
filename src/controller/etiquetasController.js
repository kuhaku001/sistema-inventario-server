const etiquetaModels = require("../database/etiquetaModel");
const Token = require('../models/token')

exports.crearEtiqueta = async (req, res) => { 
    if(await Token(req, "administrador")){
        try {
            
            const etiqueta = etiquetaModels(req.body);

            await etiqueta.save();
            res.send(etiqueta);
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.obtenerEtiquetas = async (req, res) => {
    if(await Token(req, "administrador")){
        try {
            const etiqueta = await etiquetaModels.find({tipo: ""})

            res.json(etiqueta)
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
            
        } 
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.actualizarEtiqueta = async (req, res) => {
    if(await Token(req, "administrador")){
        try {
            const { name,color_etiqueta } = req.body;
            let etiqueta = await etiquetaModels.findById(req.params.id);

            if(!etiqueta){
                res.status(404).json({msg:'no existe la etiqueta'})
            }
            etiqueta.name = name
            etiqueta.color_etiqueta = color_etiqueta
        

            etiqueta = await etiquetaModels.findOneAndUpdate({_id:req.params.id},etiqueta,{new:true})
            res.json(etiqueta);
            
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}


exports.eliminarEtiqueta = async (req, res) => {
    if(await Token(req, "administrador")){
        try {
            let etiqueta = await etiquetaModels.findById(req.params.id);

            if(!etiqueta) {
                res.status(404).json({ msg: 'No existe la etiqueta' })
            }

            await etiquetaModels.findOneAndRemove({_id:req.params.id})
            res.json(' etiqueta eliminada con  exito');
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.obtenerEtiqueta = async (req, res) => {
    if(await Token(req, "administrador")){
        try {
            let etiqueta = await etiquetaModels.findById(req.params.id);

            if(!etiqueta) {
                res.status(404).json({ msg: 'No existe la etiqueta' })
            }
        
            res.json(etiqueta);
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
} 
