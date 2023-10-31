const productosModels = require('../models/productosModels');
const productoModels = require('../models/productosModels'); 
const Token = require('./autentificarToken')

exports.crearProducto = async (req, res) => {
    if(Token(req)){
        try {

            const producto = productoModels(req.body);

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
    if(Token(req)){
        try {

            const productos = await productosModels.aggregate({}).sort({updatedAt: -1})

            res.status(200).json(productos)
            
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.actualizarProducto = async (req, res) => {
        if(Token(req)){
        try {

            const {nombre, 
                precio, 
                cantidad_disponible, 
                disponibilidad,
                descripcion,
                imagen,
                imagen_min
            } = req.body;

            let producto = await productoModels.findById(req.params.id);

            if(!producto){
                res.status(404).json({msg:'no existe el producto'})
            }

            producto.nombre=nombre
            producto.precio=precio 
            producto.cantidad_disponible =cantidad_disponible 
            producto.disponibilidad=disponibilidad
            producto.descripcion=descripcion
            producto.imagen=imagen
            producto.imagen_min=imagen_min

            producto = await productosModels.findOneAndUpdate({_id:req.params.id},producto,{new:true})
            
            res.status(200).json(producto);
            
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.obtenerProductos = async (req, res) => {
    if(Token(req)){
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
    if(Token(req)){
        try {
            let producto = await productosModels.findById(req.params.id);

            if(!producto) {
                res.status(404).json({ msg: 'No existe el producto' });
            }
            
            await productoModels.findOneAndRemove({_id:req.params.id});

            res.status(200).json('producto eliminado con  exito');
            
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}

exports.actualizarDisponibilidadProducto = async (req, res) => {
    if(Token(req)){
        try {

            const {disponibilidad} = req.body;

            let producto = await productoModels.findById(req.params.id);

            if(!producto){
                res.status(404).json({msg:'no existe el producto'})
            }


            producto = await productosModels.updateOne(
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
    if(Token(req)){
        try {

            const query = {disponibilidad: true}

            const productos = await productosModels.find(query).sort({updatedAt: -1})

            res.status(200).json(productos)
            
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    } else {
        res.status(400).send('Acceso denegado');
    }
}