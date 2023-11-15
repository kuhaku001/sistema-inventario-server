const sharp = require('sharp');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const path = require('path')

const productoModels = require('../models/productosModels'); 
const Token = require('../libs/autentificarToken')

exports.crearProducto = async (req, res) => {
    if(await Token(req, "administrador")){
        try {
            // procesar imagen
            const imagen =  req.file

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

            const producto = productoModels(req.body);
            producto.imagen = pathImagen;
            producto.imagen_min = pathImagenMin;
            producto.disponibilidad = false;

            await producto.save();
            res.status(200).send(producto)
            
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.mostrarProductos = async (req, res) => {
    if(await Token(req, "administrador")){
        try {

            const productos = await productoModels.aggregate({}).sort({updatedAt: -1})

            console.log(productos)
            res.status(200).json(productos)
            
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.actualizarProducto = async (req, res) => {
    if(await Token(req, "administrador")){
        try {

            const imagenSubmit = req.file

            const {nombre, 
                precio, 
                cantidad_disponible, 
                descripcion,
                disponibilidad,
            } = req.body;

            var producto = await productoModels.findById(req.params.id);

            if(!producto){
                res.status(404).json({msg:'no existe el producto'})
            }
            
            producto.nombre = nombre 
            producto.precio = precio 
            producto.cantidad_disponible = cantidad_disponible 
            producto.descripcion = descripcion
            producto.disponibilidad = disponibilidad

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
                    console.log(error);
                }

                fs.writeFileSync(pathImagen, imagenScale)
                fs.writeFileSync(pathImagenMin, imagenScaleMin)

                producto.imagen = await pathImagen;
                producto.imagen_min = await pathImagenMin; 

            }
            
            producto = await productoModels.findByIdAndUpdate(
                req.params.id,
                producto,
                { new: true }
            )


            res.status(200).json(producto);
            
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.obtenerProducto = async (req, res) => {
    if(await Token(req, "administrador")){
        try {

            let producto = await productoModels.findById(req.params.id);

            if(!producto) {
                res.status(404).json({ msg: 'No existe el producto' })
            }
            
            res.status(200).json(producto)
            
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.eliminarProducto = async (req, res) => {
    if(await Token(req, "administrador")){
        try {
            let producto = await productoModels.findById(req.params.id);

            if(!producto) {
                res.status(404).json({ msg: 'No existe el producto' });
            }
            
            const productoEliminado = await productoModels.findOneAndRemove({_id:req.params.id});

            try {
                fs.unlinkSync(productoEliminado.imagen)
                fs.unlinkSync(productoEliminado.imagen_min)
    
            } catch (error) {
                console.log(error)
            }

            res.status(200).json('producto eliminado con  exito');
            
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.actualizarDisponibilidadProducto = async (req, res) => {
    if(await Token(req, "administrador")){
        try {

            const {disponibilidad} = req.body;

            let producto = await productoModels.findById(req.params.id);

            if(!producto){
                res.status(404).json({msg:'no existe el producto'})
            }


            producto = await productoModels.updateOne(
                {_id},
                {$set : {disponibilidad : disponibilidad}
            })
            
            res.status(200).json(producto);
            
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

// Consultas usuario

exports.mostrarProductosUsuario = async (req, res) => {
    if(await Token(req, "administrador")){
        try {

            const query = {disponibilidad: true}

            const productos = await productoModels.find(query).sort({updatedAt: -1})
            res.status(200).json(productos)
            
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}