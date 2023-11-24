const Material = require("../models/materiales");
const Token = require('../models/token')

exports.crearMateriales = async (req, res) => { 
    try {
        if(await Token(req, "administrador")){

            const material = await Material.crearMaterial(req.body)
            res.status(200).send(material);
        
        } else {
            res.send('Acceso denegado')
        }
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarMateriales = async (req, res) => {
    try {
        if(await Token(req, "administrador")){

            const material = await Material.actualizarMateriales(req.params.id, req.body)
            res.json(material);

        } else {
            res.send('Acceso denegado')
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerMaterial = async (req, res) => {
    try {
        if(await Token(req, "administrador")){

            const material = await Material.obtenerMaterial(req.params.id);
            res.json(material);

        } else {
            res.send('Acceso denegado')
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 

exports.eliminarMaterial = async (req, res) => {
    try {
        if(await Token(req, "administrador")){
            const material = await Material.eliminarMaterial(req.params.id);
            res.json(material);
        } else {
            res.send('Acceso denegado')
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.mostrarMaterialEtiquetas = async (req,res) => { 
    try {
        if(await Token(req, "administrador")){
            const material = await Material.mostrarMaterialEtiquetas()
            res.json(material)
        } else {
            res.send('Acceso denegado')
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    } 
}

exports.registrarEtiqueta = async (req,res) => {
    try {
        if(await Token(req, "administrador")){
            const id = req.params;
            const etiquetas = req.body; 
        
            const update = await Material.registrarEtiqueta(id, etiquetas)
            res.json(update)
        } else {
            res.send('Acceso denegado')
        } 
    } catch (error) {
        console.log(error);
        res.status(400).send('error')
    }
}