const Material = require("../models/materiales");

exports.crearMateriales = async (req, res) => { 
    try {
        const material = await Material.crearMaterial(req, req.body)
        res.status(200).send(material);
        
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarMateriales = async (req, res) => {
    try {
        const material = await Material.actualizarMateriales(req, req.params.id, req.body)
        res.json(material);
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerMaterial = async (req, res) => {
    try {
        const material = await Material.obtenerMaterial(req, req.params.id);
        res.json(material);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 

exports.eliminarMaterial = async (req, res) => {
    try {
        const material = await Material.eliminarMaterial(req, req.params.id);
        res.json(material);
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.mostrarMaterialEtiquetas = async (req,res) => { 
    try {
        const material = await Material.mostrarMaterialEtiquetas(req)
        res.json(material)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    } 
}

exports.registrarEtiqueta = async (req,res) => {
    try {
        const id = req.params;
        const etiquetas = req.body; 
        
        const update = await Material.registrarEtiqueta(req, id, etiquetas)
        res.json(update)

    } catch (error) {
        console.log(error);
        res.status(400).send('error')
    }
}