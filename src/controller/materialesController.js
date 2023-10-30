const etiquetaModels = require("../models/etiquetaModels");
const materialesModels = require("../models/materialesModels");
const Token = require('./autentificarToken')


exports.crearMateriales = async (req, res) => { 
    if(Token(req)){
        try {
               
            // Creamos nuestro material
            const material = materialesModels(req.body);
    
            await material.save();
            res.status(200).send(material);
            
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.obtenerMaterialesEtiquetas = async (req, res) => {
    if(Token(req)){
        try {

            const material = await materialesModels.aggregate()
            res.json(material)
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
            
        } 
    } else {
        res.status(400).send('Acceso denegado');
    }
} 

exports.actualizarMateriales = async (req, res) => {
    if(Token(req)){
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
    } else {
        res.status(400).send('Acceso denegado');
    }
}


exports.obtenerMaterial = async (req, res) => {
    if(Token(req)){
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
        res.status(400).send('Acceso denegado');
    }
    } 
    


exports.eliminarMaterial = async (req, res) => {
    if(Token(req)){
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
        res.status(400).send('Acceso denegado');
    }
    
}

// mosrtar materiales con las etquetas

exports.mostrarMaterialEtiquetas = async (req,res) => { 
    if(Token(req)){
        try {

            const material = await materialesModels.aggregate([
                {
                    $unwind: "$etiquetas"
                },
                {
                    $lookup : {
                        from: "etiquetas", 
                        localField: "etiquetas", 
                        foreignField: "name", 
                        as: "Etiquetasall"
                    }
                },
                {
                
                    $group: {
                        _id: "$_id",
                        Etiquetas: { $push: "$Etiquetasall" },
                        nombre: {$first: "$nombre"},
                        cantidad: {$first: "$cantidad"},
                        precio: {$first: "$precio"},
                        descripcion: {$first: "$descripcion"},
                        origen: {$first: "$origen"},
                        estado: {$first: "$estado"},
                }
                },
                {
                    $project: {
                        _id: 1,
                        Etiquetas: { 
                            $reduce: { 
                                input: "$Etiquetas", initialValue: [], in: { 
                                    $concatArrays: ["$$value", "$$this"] 
                                } 
                            }
                        },
                        nombre: 1,
                        cantidad: 1,
                        precio: 1,
                        descripcion: 1,
                        origen: 1,
                        estado: 1
                }}]).sort({updatedAt: -1})
            res.json(material)
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        } 
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.registrarEtiqueta = async (req,res) => {
    if(Token(req)){

      try {
        const{_id}=req.params;
        const etiquetas = req.body; 

        
        console.log(etiquetas)
        const update = await materialesModels.updateOne(
            {_id},
            {$set : {"etiquetas" : etiquetas}
        });

        res.json(update)
        } catch (error) {
        console.log(error);
        res.status(400).send('error')
        }

    } else {
        res.status(400).send('Acceso denegado');
    }
}