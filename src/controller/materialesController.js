
const etiquetaModels = require("../models/etiquetaModels");
const materialesModels = require("../models/materialesModels");
const Token = require('./autentificarToken')


exports.crearMateriales = async (req, res) => { 
    
        try {
               
            // Creamos nuestro material
            const material = materialesModels (req.body);
    
            await material.save();
            res.send(material);
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
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
    } 
    


exports.eliminarMaterial = async (req, res) => {
    
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
    
    
}

// mosrtar materiales con las etquetas

exports.mostrarMaterialEtiquetas = async (req,res) => { 
    try {

        const material = await materialesModels.aggregate([
            {$lookup : {
                    from: "etiquetas", 
                    localField: "etiquetas", 
                    foreignField: "name", 
                    as: "Etiquetas"
                }
            },
            {$project : {
                etiquetas: 0
                }
            }
        ]).sort({updatedAt: -1}) // Ordena desde la mas reciente actualizacion
        res.json(material)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    } 
}

exports.registrarEtiqueta = async (req,res) => {
    try {   
        const{_id}=req.params;
        const{etiqueta}=req.params;

        const update = await materialesModels.updateOne(
            {_id},
            {$push : {etiquetas : etiqueta }
        });
        console.log(update)
    } catch (error) {
        console.log(error);
    }
}