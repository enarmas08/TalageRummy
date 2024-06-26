const Player = require('../models/player.model');
const { Op } = require('sequelize');
class PlayerService {

    /**
    * Cr�er un joueur
    * @param {Player} playerData L'objet de la requ�te.
    */
    async createPlayer(playerData) {
        const player = await Player.create(playerData);
        return player;
    }

    /**
    * connecter un joueur
    * @param {number} userId l'identifiant d'utilisateur.
    * @param {boolean} connect connect� ou d�connect� le joueur.
    */
    async connectOrDeconnectPlayer(userId, connect) {
        const player = await Player.update(
            { isConnect: connect },
            {
                where: {
                    userId: userId,
                },
            });
        return player;
    }

    async findPlayerById(playerId) {
        const player = await Player.findByPk(playerId);
        return player;
    }

    /**
    * connecter un joueur
    * @param {number} userId l'identifiant d'utilisateur.
    */
    async findPlayerByUserId(userId) {
        const player = await Player.findOne({ where: { userId: userId } });
        return player;
    }

    async findAllPlayersConnected(excludeId) {
        return await Player.findAll({
            where: {
                isConnect: true,
                id: {
                    [Op.ne]: excludeId 
                },
            }
        });
    }

    // Autres m�thodes pour g�rer les utilisateurs...
}

module.exports = new PlayerService();
