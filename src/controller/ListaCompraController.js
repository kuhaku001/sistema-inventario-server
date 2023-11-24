const Listas = require("../models/ListaDeCompras");
const Token = require('./models/token')

exports.crearLista = async (req, res) => { 
    
    try {
        if(await Token(req, "administrador")){
            const lista = Listas.crearLista(req.body);
            res.send(lista);
        } else {
            return 'Acceso denegado'
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.actualizarLista = async (req, res) => {
    
    try {
        if(await Token(req, "administrador")){
            const lista = await Listas.actualizarLista(req.params.id, req.body);
            res.json(lista);
        } else {
            return 'Acceso denegado'
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerLista = async (req, res) => {
   
    try {
        if(await Token(req, "administrador")){
            const lista = await Listas.obtenerLista(req.params.id);
            res.json(lista);
        } else {
            return 'Acceso denegado'
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 


exports.eliminarLista = async (req, res) => {
    
    try {
        if(await Token(req, "administrador")){
            const lista = await Listas.eliminarLista(req.params.id);
            res.json(lista);
        } else {
            return 'Acceso denegado'
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerListas = async (req, res) => {

    try {
        if(await Token(req, "administrador")){
            const lista = await Listas.obtenerListas();
            res.json(lista);
        } else {
            return 'Acceso denegado'
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
