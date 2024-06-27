const userService = require('../services/user.service');
const playerService = require('../services/player.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CONST = require('./../config/const'); // Chemin vers le fichier de configuration Sequelize
const express = require('express');

class UserController {

    /**
     * Méthode de se connecter
     * @param {express.Request} req L'objet de la requête.
     * @param {express.Response} res L'objet de la réponse.
     */
    async login(req, res) {
        try {
            const userData = req.body;
            const user = await userService.findUserByUsername(userData.userName);

            if (user && bcrypt.compareSync(userData.password, user.password)) {
                const token = jwt.sign({ id: user.id, email: user.email }, CONST.TOKEN_SECRET, { expiresIn: CONST.TOKEN_EXPIRE_SEC });

                let player = await playerService.findPlayerByUserId(user.id);
                await playerService.connectOrDisconnectPlayer(user.id, true);
                player.isConnect = true;

                res.json({ token, player: player });
            } else {
                res.status(401).send('Invalid User');
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Méthode d'enregistrement
     * @param {express.Request} req L'objet de la requête.
     * @param {express.Response} res L'objet de la réponse.
     */
    async register(req, res) {
        try {
            const userData = req.body;

            userData.password = await bcrypt.hash(userData.password, 5);

            const user = await userService.createUser(userData);
            await playerService.createPlayer({ userId: user.id, userName: user.userName });
            res.status(201).json({ created: true });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Méthode de se déconnecter
     * @param {express.Request} req L'objet de la requête.
     * @param {express.Response} res L'objet de la réponse.
     */
    async logout(req, res) {
        try {
            const userId = req.params.id;

            await playerService.connectOrDisconnectPlayer(Number(userId), false);

            res.json();

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Méthode pour obtenir utilisateur par l'id
     * @param {express.Request} req L'objet de la requête.
     * @param {express.Response} res L'objet de la réponse.
     */
    async getUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await userService.findUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Autres méthodes pour gérer les requêtes des utilisateurs...
}

module.exports = new UserController();
