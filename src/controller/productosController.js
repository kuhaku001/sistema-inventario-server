const Producto = require('../models/productos')

exports.crearProducto = async (req, res) => {
    try {
        const producto = await Producto.crearProducto(req, req.body, req.file)
        res.status(200).send(producto)
            
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.obtenerProductos(req)

        res.status(200).json(productos)
            
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarProducto = async (req, res) => {
    try {
        const producto = await Producto.actualizarProducto(req, req.params.id, req.body, req.file)
        res.status(200).json(producto);
            
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProducto = async (req, res) => {
    try {

        const producto = await Producto.obtenerProducto(req, req.params.id);
            
        res.status(200).json(producto)
            
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarProducto = async (req, res) => {
    try {

        const producto = await Producto.eliminarProducto(req, req.params.id);
        res.status(200).json(producto);
            
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

// Consultas usuario

exports.mostrarProductosUsuario = async (req, res) => {
        try {

        const productos = await Producto.mostrarProductos(req)
        res.status(200).json(productos)
            
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
}