const cajaModels = require("../models/cajaModels");

exports.crearCajas = async (req, res) => { 
    
    try {
           
        // Creamos nuestra  caja
        const caja = cajaModels (req.body);

        await caja.save();
        res.send(caja);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}

exports.actualizarCaja = async (req, res) => {
    
    try {
        const { nombre,materiales} = req.body;
        let caja =await cajaModels.findById(req.params.id);

        if(!caja){
            res.status(404).json({msg:'la  caja  no  existe'})
        }
        caja.nombre=nombre
        caja.materiales=materiales
        

        caja= await cajaModels.findOneAndUpdate({_id:req.params.id},caja,{new:true})
        res.json(caja);
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerCaja = async (req, res) => {
   
    try {
        let caja = await cajaModels.findById(req.params.id);

        if(!caja) {
            res.status(404).json({ msg: 'No existe la caja' })
        }
    
        res.json(caja);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 


exports.eliminarCaja = async (req, res) => {
    
    try {
        let caja = await cajaModels.findById(req.params.id);

        if(!caja) {
            res.status(404).json({ msg: 'No existe la caja' })
        }

        await cajaModels.findOneAndRemove({_id:req.params.id})
        res.json('caja eliminada con  exito');
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}



