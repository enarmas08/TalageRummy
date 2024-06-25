const userService = require('../services/user.service');
const playerService = require('../services/player.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CONST = require('./../config/const'); // Chemin vers le fichier de configuration Sequelize

class UserController {

    async login(req, res) {
        try {
            const userData = req.body;
            const user = await userService.findUserByUsername(userData.username);

            if (user && bcrypt.compareSync(userData.password, user.password)) {
                const token = jwt.sign({ id: user.id, email: user.email }, CONST.TOKEN_SECRET, { expiresIn: CONST.TOKEN_EXPIRE_SEC });

                const player = await playerService.findPlayerByUserId(user.id);

                res.json({ token, player: player });
            } else {
                res.status(401).send('Invalid User');
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

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
