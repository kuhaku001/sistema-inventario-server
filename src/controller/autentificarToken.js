const  { buscarUsuarioID } = require('./usuarioController')
const jws = require('jsonwebtoken');

async function verificarToken(req) {
    try {
        if(req.headers.authorization !== undefined){
            const token = req.headers.authorization.split(' ')[1]
            
            if(typeof(token) === 'string' && token !== null && token !== undefined){
                try {
                    const payload = jws.verify(token, 'secretKey')
                    const userID = payload._id

                    if(await buscarUsuarioID(userID)){
                        return true
                    } else {
                        return false
                    }
                } catch {
                    return false
                }
                
            } else {
                return false
            }

        } else{
            return false
        }
    } catch {
        return false
    }
}

module.exports = verificarToken;


