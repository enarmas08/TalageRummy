const jwt = require('jsonwebtoken');
const CONST = require('../config/const'); // Chemin vers le fichier de configuration Sequelize


// Middleware to authenticate token
function authenticateToken(socket, next) {
    const token = socket.handshake.query.token;
    if (!token) {
        return next(new Error('Unauthorized: Token not provided'));
    }
    jwt.verify(token, CONST.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error('Unauthorized: Invalid token from Socket'));
        }
        socket.decoded = decoded;
        next();
    });
}

module.exports = authenticateToken;
