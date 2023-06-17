// Modulo de encriptacion de comtraseñas y comparacion de las mismas

const bcrypt = require('bcrypt');

// Encriptador de contraseñas

const encriptar = async (TextPlain) => {
    const hash = await bcrypt.hash(TextPlain, 10);
    return hash;
};

// Comparador de constraseñas

const comparar = async (PasswordPlain, HashPassword) => {
    return await bcrypt.compare(PasswordPlain, HashPassword);
};

module.exports = {encriptar, comparar};