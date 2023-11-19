const Listas = require("../models/ListaDeCompras");

exports.crearLista = async (req, res) => { 
    
    try {
        const lista = Listas.crearLista(req, req.body);
        res.send(lista);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.actualizarLista = async (req, res) => {
    
    try {
        const lista = await Listas.actualizarLista(req, req.params.id, req.body);
        res.json(lista);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerLista = async (req, res) => {
   
    try {
        const lista = await Listas.obtenerLista(req, req.params.id);
        res.json(lista);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 


exports.eliminarLista = async (req, res) => {
    
    try {
        const lista = await Listas.eliminarLista(req, req.params.id);
        res.json(lista);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerListas = async (req, res) => {
    
    try {
        const lista = await Listas.obtenerListas(req);
        res.json(lista);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
