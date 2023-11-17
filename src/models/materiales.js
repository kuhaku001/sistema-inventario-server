const Material = require("../database/materialesModel");
const Token = require('./token')

exports.crearMaterial = async (autorizacion, materialData) => { 
    if(await Token(autorizacion, "administrador")){

        const material = Material(materialData);
    
        await material.save();

        return material
    } else {
        return 'Acceso denegado'
    }
}

exports.actualizarMateriales = async (autorizacion, id, materialData) => {
    if(await Token(autorizacion, "administrador")){

        const {nombre, cantidad, precio, origen, descripcion} = materialData;
            
        var material = await Material.findById(id);

        if(!material){
            return {msg:'no existe el material'};
        }
        material.nombre = nombre
        material.cantidad = cantidad
        material.precio = precio
        material.origen = origen
        material.descripcion = descripcion

        material = await Material.findOneAndUpdate({ _id:id }, material, { new:true })
        
        return material
        
    } else {
        return 'Acceso denegado'
    }
}

exports.obtenerMaterial = async (autorizacion, id) => {
    if(await Token(autorizacion, "administrador")){

        let material = await Material.findById(id);

        if(!material) {
           return { msg: 'No existe el material' }
         }
        
        return material

    } else {
        return 'Acceso denegado'
    }
} 

exports.eliminarMaterial = async (autorizacion, id) => {
    if(await Token(autorizacion, "administrador")){

        let material = await Material.findById(id);

        if(!material) {
            return { msg: 'No existe el material' }
        }

        await Material.findOneAndRemove({_id:id})

        return('material eliminado con  exito');  

    } else {
        return('Acceso denegado');
    }
    
}

exports.mostrarMaterialEtiquetas = async (autorizacion) => { 

    if(await Token(autorizacion, "administrador")){

        const material = await Material.aggregate([
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
                }
            }
        ]).sort({updatedAt: -1})

        return(material)

    } else {
        return('Acceso denegado');
    }
}

exports.registrarEtiqueta = async (autorizacion, id, etiquetas) => {
    if(await Token(autorizacion, "administrador")){
        
        const update = await Material.updateOne(
            {id},
            {$set : {"etiquetas" : etiquetas}
        });

        return(update)

    } else {
        return('Acceso denegado');
    }
}