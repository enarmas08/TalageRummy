const jwt = require('jsonwebtoken');
const CONST = require('./../config/const'); // Chemin vers le fichier de configuration Sequelize


// Middleware to authenticate token
function authenticateToken(req, res, next) {
    if (req.originalUrl.startsWith('/socket/')) {
        // Ne pas traiter les requêtes Socket.IO avec le middleware de API
        return next();
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token not provided from API' });
    }
  
    jwt.verify(token, CONST.TOKEN_SECRET, (err, user) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
      }
      req.user = user;
      next();
    });
  }

module.exports = authenticateToken;
