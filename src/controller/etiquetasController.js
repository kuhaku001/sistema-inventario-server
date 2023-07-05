const etiquetaModels = require("../models/etiquetaModels");

exports.crearEtiqueta = async (req, res) => { 
    
    try {
           
        // Creamos nuestro material
        const etiqueta = etiquetaModels (req.body);

        await etiqueta.save();
        res.send(etiqueta);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}

exports.obtenerEtiquetas = async (req, res) => {
   
    try {


    

        const etiqueta = await etiquetaModels.find() // no funcionaba con el aggregate

        res.json(etiqueta)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    } 
}



exports.actualizarEtiqueta = async (req, res) => {
    
    try {
        const { name,color_etiqueta } = req.body;
        let etiqueta = await etiquetaModels.findById(req.params.id);

        if(!etiqueta){
            res.status(404).json({msg:'no existe el material'})
        }
        etiqueta.name = name
        etiqueta.color_etiqueta = color_etiqueta
      

        etiqueta = await etiquetaModels.findOneAndUpdate({_id:req.params.id},etiqueta,{new:true})
        res.json(etiqueta);
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}



exports.eliminarEtiqueta = async (req, res) => {
    
    try {
        let etiqueta = await etiquetaModels.findById(req.params.id);

        if(!etiqueta) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        await etiquetaModels.findOneAndRemove({_id:req.params.id})
        res.json('material eliminado con  exito');
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}

exports.obtenerEtiqueta = async (req, res) => {
   
    try {
        let etiqueta = await etiquetaModels.findById(req.params.id);

        if(!etiqueta) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
    
        res.json(etiqueta);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 


"aaa"