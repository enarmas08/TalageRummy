const playerService = require('../services/player.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');

class PlayerController {

    /**
     * obtient les joueurs connectés
     * @param {express.Request} req L'objet de la requête.
     * @param {express.Response} res L'objet de la réponse.
     */
    async getAllPlayerConnected(req, res) {
        try {
            const playerId = req.params.id;

            const players = await playerService.findAllPlayersConnected(playerId);
            res.json(players);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Autres méthodes pour gérer les requêtes des utilisateurs...
}

module.exports = new PlayerController();
