const Producto = require('../models/productos')
const Token = require('../models/token')

exports.crearProducto = async (req, res) => {
    try {
        if(await Token(req, "administrador")){
 
            const producto = await Producto.crearProducto(req.body, req.file)
            res.status(200).send(producto)
        } else {
            res.send('Acceso denegado')
        }
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProductos = async (req, res) => {
    try {
        if(await Token(req, "administrador")){
 
            const productos = await Producto.obtenerProductos()
            res.status(200).json(productos)
        } else {
            res.send('Acceso denegado')
        }
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarProducto = async (req, res) => {
    try {
        if(await Token(req, "administrador")){
 
            const producto = await Producto.actualizarProducto(req.params.id, req.body, req.file)
            res.status(200).json(producto);
        } else {
            res.send('Acceso denegado')
        } 
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        if(await Token(req, "administrador")){
 
            const producto = await Producto.eliminarProducto(req.params.id);
            res.status(200).json(producto);
        } else {
            res.send('Acceso denegado')
        } 
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

// usuario

exports.mostrarProductosUsuario = async (req, res) => {
    try {
        const productos = await Producto.mostrarProductosUsuario()
        res.status(200).json(productos)

    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProducto = async (req, res) => {
    try {
        const producto = await Producto.obtenerProducto(req.params.id);
        res.status(200).json(producto)

    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}