const express = require('express');
const playerController = require('../../controllers/player.controller');

const router = express.Router();

router.get('/allplayerconnected/:id', playerController.getAllPlayerConnected);

// Autres routes pour les utilisateurs...

module.exports = router;
