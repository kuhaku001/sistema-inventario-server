// Modulo de encriptacion de comtraseñas y comparacion de las mismas

const bcrypt = require('bcrypt');

// Encriptador de contraseñas

const encrypt = async (TextPlain) => {
    const hash = await bcrypt.hash(TextPlain, 10);
    return hash;
};

// Comparador de constraseñas

const compare = async (PasswordPlain, HashPassword) => {
    return await bcrypt.compare(PasswordPlain, HashPassword);
};

module.exports = {encrypt, compare};