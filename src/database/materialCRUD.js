const materialModel = require('../model/models'); 

const crearMaterial = async(nombreMaterial, cantidadMaterial, precioMaterial, descripcionMaterial, origenMaterial, etiquetasMaterial = [], estadoMaterial) => {
    const material = new materialModel.material({
        nombre : nombreMaterial,
        cantidad : cantidadMaterial,
        precio : precioMaterial,
        descripcion : descripcionMaterial,
        origen : origenMaterial,
        etiquetas : etiquetasMaterial,
        'estado reserva' : estadoMaterial
    })
    await material.save()
}

const buscarMaterial = async (nombreMaterial) => {  // se busca por el nombre
    const material = await materialModel.material.findOne({'nombre' : nombreMaterial})
    const savedUsuario = await material.save();
    
    return savedUsuario;
}

const eliminarMaterial = async (nombreMaterial) => {
    const material = await materialModel.material.deleteOne({'nombre' : nombreMaterial})
}

module.exports = {crearMaterial, buscarMaterial, eliminarMaterial}