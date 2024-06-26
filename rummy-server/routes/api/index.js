
const router = require("express").Router();

const userRoutes = require('./user.route'); // Chemin vers les routes des utilisateurs
const playerRoutes = require('./player.route'); // Chemin vers les routes des salles

// Middleware pour gérer les routes des utilisateurs
router.use('/users', userRoutes);
// Middleware pour gérer les routes des salles
router.use('/players', playerRoutes);


module.exports = router;