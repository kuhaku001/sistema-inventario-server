const Caja = require("../models/cajas");

exports.crearCajas = async (req, res) => { 
    
    try {
        const caja = Caja.crearCaja(req, req.body);
        res.send(caja);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}

exports.actualizarCaja = async (req, res) => {
    
    try {
        const caja =await Caja.actualizarCajas(req, req.params.id, req.body);
        res.json(caja);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerCaja = async (req, res) => {
   
    try {
        const caja = await Caja.obtenerCaja(req, req.params.id);
        res.json(caja);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 


exports.eliminarCaja = async (req, res) => {
    
    try {
        const caja = await Caja.eliminarCaja(req, req.params.id);
        res.json(caja);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCajas = async (req, res) => {
    
    try {
        const caja = await Caja.obtenerCajas(req);
        res.json(caja);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
