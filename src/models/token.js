const  { buscarUsuarioID, buscarUsuarioRol } = require('./usuario')
const jws = require('jsonwebtoken');
require('dotenv').config();

async function verificarToken(req, rol) {
    try {
        
        if(req.headers.authorization !== undefined){

            const token = req.headers.authorization.split(' ')[1]
            
            if(typeof(token) === 'string' && token !== null && token !== undefined){

                try {

                    const payload = jws.verify(token, process.env.JSON_WEB_TOKEN_KEY);
                    const userID = payload._id;
                    const time = Date.now() - payload.exp;
                    
                    if(await buscarUsuarioID(userID) && await buscarUsuarioRol(userID, rol) && time <= 28800000){
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


