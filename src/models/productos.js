const sharp = require('sharp');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const path = require('path')

const Token = require('./token')
const Producto = require("../database/productosModel");


exports.crearProducto = async (autorizacion, productoData, archivo) => {
    if(await Token(autorizacion, "administrador")){

        // procesar imagen
        const imagen =  archivo

        const imagenScale = await sharp(imagen.buffer).resize(500, 500, {
            fit:'contain',
            background: {r: 255, g: 255, b: 255, alpha: 2}
        }).toBuffer()

        const imagenScaleMin = await sharp(imagen.buffer).resize(250, 250, {
            fit:'contain',
            background: {r: 255, g: 255, b: 255, alpha: 2}
        }).toBuffer()

        const pathImagen = 'uploads/' + uuidv4() + path.extname(imagen.originalname)
        const pathImagenMin = 'uploads/' + uuidv4() + path.extname(imagen.originalname)

        fs.writeFileSync(pathImagen, imagenScale)
        fs.writeFileSync(pathImagenMin, imagenScaleMin)

        // Crear Producto

        const producto = new Producto(productoData);
        producto.imagen = pathImagen;
        producto.imagen_min = pathImagenMin;
        producto.disponibilidad = false;

        await producto.save();

        return producto
            
    } else {
        return 'Acceso denegado'
    }
}

exports.obtenerProductos = async (autorizacion) => {
    if(await Token(autorizacion, "administrador")){
        const productos = await Producto.aggregate({}).sort({updatedAt: -1})
        return productos
            
    } else {
        return 'Acceso denegado'
    }
}

exports.actualizarProducto = async (autorizacion, id, productoData, archivo) => {
    if(await Token(autorizacion, "administrador")){

            const imagenSubmit = archivo

            const {nombre, 
                precio, 
                cantidad_disponible, 
                descripcion,
                disponibilidad,
            } = productoData;

            var producto = await Producto.findById(id);

            if(!producto){
                return {msg:'no existe el producto'}
            }
            
            if(nombre && precio && cantidad_disponible && descripcion){
                producto.nombre = nombre 
                producto.precio = precio 
                producto.cantidad_disponible = cantidad_disponible 
                producto.descripcion = descripcion
            }

            producto.disponibilidad = disponibilidad

            console.log(disponibilidad)

            if(imagenSubmit){
                const imagenScale = await sharp(imagenSubmit.buffer).resize(500, 500, {
                    fit:'contain',
                    background: {r: 255, g: 255, b: 255, alpha: 2}
                }).toBuffer()

                const imagenScaleMin = await sharp(imagenSubmit.buffer).resize(250, 250, {
                    fit:'contain',
                    background: {r: 255, g: 255, b: 255, alpha: 2}
                }).toBuffer()

                const pathImagen = 'uploads/' + uuidv4() + path.extname(imagenSubmit.originalname)
                const pathImagenMin = 'uploads/' + uuidv4() + path.extname(imagenSubmit.originalname)

                try {
                    fs.unlinkSync(producto.imagen)
                    fs.unlinkSync(producto.imagen_min)
                } catch (error) {
                    console.log(error)
                }

                fs.writeFileSync(pathImagen, imagenScale)
                fs.writeFileSync(pathImagenMin, imagenScaleMin)

                producto.imagen = await pathImagen;
                producto.imagen_min = await pathImagenMin; 

            }
            
            producto = await Producto.findByIdAndUpdate(
                id,
                producto,
                { new: true }
            )

            return producto
            
    } else {
        return 'Acceso denegado'
    }
}

exports.obtenerProducto = async (autorizacion, id) => {
    if(await Token(autorizacion, "administrador")){

        const producto = await Producto.findById(id);

        if(!producto) {
            return { msg: 'No existe el producto' }
        }
            return producto
            
    } else {
        return 'Acceso denegado'
    }
}

exports.eliminarProducto = async (autorizacion, id) => {
    if(await Token(autorizacion, "administrador")){
        const producto = await Producto.findById(id);

        if(!producto) {
            return { msg: 'No existe el producto' }
        }
            
        const productoEliminado = await Producto.findOneAndRemove({_id:id});

        try {
            fs.unlinkSync(productoEliminado.imagen)
            fs.unlinkSync(productoEliminado.imagen_min)
    
        } catch (error) {
            console.log(error)
        }

            return 'producto eliminado con  exito'
            
    } else {
        return 'Acceso denegado'
    }
}

// Consultas usuario

exports.mostrarProductosUsuario = async (autorizacion) => {
    if(await Token(autorizacion, "usuario")){

        const query = {disponibilidad: true}

        const productos = await productoModels.find(query).sort({updatedAt: -1})
        return productos

    } else {
        return 'Acceso denegado'
    }
}