const ListaCompraModels = require("../models/ListaCompraModels");

exports.crearLista = async (req, res) => { 
    
    try {
           
        // Creamos nuestra  caja
        const lista = ListaCompraModels (req.body);

        await lista.save();
        res.send(lista);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}

//QUEDE  ACA  QUEDA  CAMBIAR  COSAS
exports.actualizarLista = async (req, res) => {
    
    try {
        const { nombre_lista,ListaItems} = req.body;
        let lista =await ListaCompraModels.findById(req.params.id);

        if(!lista){
            res.status(404).json({msg:'la  caja  no  existe'})
        }
        lista.nombre_lista=nombre_lista
        lista.ListaItems=ListaItems
        

        lista= await ListaCompraModels.findOneAndUpdate({_id:req.params.id},caja,{new:true})
        res.json(lista);
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerLista = async (req, res) => {
   
    try {
        let lista = await ListaCompraModels.findById(req.params.id);

        if(!lista) {
            res.status(404).json({ msg: 'No existe la caja' })
        }
    
        res.json(lista);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 


exports.eliminarLista = async (req, res) => {
    
    try {
        let lista = await ListaCompraModels.findById(req.params.id);

        if(!lista) {
            res.status(404).json({ msg: 'No existe la caja' })
        }

        await ListaCompraModels.findOneAndRemove({_id:req.params.id})
        res.json('caja eliminada con  exito');
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}
