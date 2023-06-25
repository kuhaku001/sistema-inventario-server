const  { buscarUsuarioID } = require('../database/usuarioCRUD')
const jws = require('jsonwebtoken');

function verificarToken(req){
    if(req.headers.authorization !== undefined){
        const token = req.headers.authorization.split(' ')[1]
        
        if(typeof(token) === 'string' && token !== null && token !== undefined){
            try {
                const payload = jws.verify(token, 'secretKey')
                const userID = payload._id

                if(buscarUsuarioID(userID)){
                    return true
                } else {
                    return false
                }
            } catch (error) {
                return false
            }
            
        } else {
            return false
        }

    } else{
        return false
    }
}

module.exports = verificarToken;
