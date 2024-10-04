require('dotenv').config();

const authConfig = {
    jwtSecret: process.env.JWT_SECRET || 'default_secret_key', // Clave secreta para firmar el JWT
    jwtExpiry: '1h', // Tiempo de expiración del JWT
};

module.exports = authConfig;
