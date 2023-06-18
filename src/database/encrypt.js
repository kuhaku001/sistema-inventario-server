// Modulo de encriptacion de comtraseñas y comparacion de las mismas

const bcrypt = require('bcrypt');

// Encriptador de contraseñas

const encriptar = async (textoPlano) => {
    const hash = await bcrypt.hash(textoPlano, 10);
    return hash;
};

// Comparador de constraseñas

const comparar = async (contraseñaPlana, contraseñaHash) => {
    return await bcrypt.compare(contraseñaPlana, contraseñaHash);
};

module.exports = {encriptar, comparar};