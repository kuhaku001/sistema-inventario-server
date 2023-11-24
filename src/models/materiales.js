const Material = require("../database/materialesModel");

exports.crearMaterial = async (materialData) => { 

    const material = Material(materialData);

    const materialNombre = await Material.findOne({nombre : material.nombre});

    if(materialNombre){
        return 'Ya existe el material'
    }
    
    await material.save();

    return material

}

exports.actualizarMateriales = async (id, materialData) => {

    const {nombre, cantidad, precio, origen, descripcion} = materialData;
            
    var material = await Material.findById(id);

    if(!material){
        return 'no existe el material'
    }
    material.nombre = nombre
    material.cantidad = cantidad
    material.precio = precio
    material.origen = origen
    material.descripcion = descripcion

    material = await Material.findOneAndUpdate({ _id:id }, material, { new:true })
        
    return material
        
}

exports.obtenerMaterial = async (id) => {

    let material = await Material.findById(id);

    if(!material) {
        return 'No existe el material' 
    }
    return material
} 

exports.eliminarMaterial = async (id) => {

    let material = await Material.findById(id);

    if(!material) {
        return { msg: 'No existe el material' }
    }

    await Material.findOneAndRemove({_id:id})

    return { msg: 'material eliminado con  exito' };  
    
}

exports.mostrarMaterialEtiquetas = async () => { 

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

}

exports.registrarEtiqueta = async (id, etiquetas) => {

        const update = await Material.updateOne(
            {id},
            {$set : {"etiquetas" : etiquetas}
        });

        return(update)


}