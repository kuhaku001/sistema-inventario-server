
const materialesModels = require("../models/materialesModels");
const Token = require('./autentificarToken')


exports.crearMateriales = async (req, res) => { 
    if(Token(req)){
        try {
               
            // Creamos nuestro material
            const material = materialesModels (req.body);
    
            await material.save();
            res.send(material);
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(404).send('solicitud no autorizada')
    }
}

exports.obtenerMateriales = async (req, res) => {
    if(await Token(req)){
        try {

            const material = await materialesModels.find().limit(20).skip();
            res.json(material)
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
            
        } 
        } else {
            res.status(404).send('solicitud no autorizada')
    }
}



exports.actualizarMateriales = async (req, res) => {
    
        try {
            const { nombre,cantidad,precio,origen,descripcion } = req.body;
            let material =await materialesModels.findById(req.params.id);

            if(!material){
                res.status(404).json({msg:'no existe el material'})
            }
            material.nombre=nombre
            material.cantidad=cantidad
            material.precio=precio
            material.origen=origen
            material.descripcion=descripcion

            material= await materialesModels.findOneAndUpdate({_id:req.params.id},material,{new:true})
            res.json(material);
            
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }

}


exports.obtenerMaterial = async (req, res) => {
    if(await Token(req)){
        try {
            let material = await materialesModels.findById(req.params.id);

            if(!material) {
                res.status(404).json({ msg: 'No existe el producto' })
            }
        
            res.json(material);
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(404).send('solicitud no autorizada')
    }
}


exports.eliminarMaterial = async (req, res) => {
    if(await Token(req)){
        try {
            let material = await materialesModels.findById(req.params.id);

            if(!material) {
                res.status(404).json({ msg: 'No existe el producto' })
            }

            await materialesModels.findOneAndRemove({_id:req.params.id})
            res.json('material eliminado con  exito');
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(404).send('solicitud no autorizada')
    }
}