const Player = require('../models/player.model');

class PlayerService {
    async createPlayer(playerData) {
        const player = await Player.create(playerData);
        return player;
    }

    async findPlayerById(playerId) {
        const player = await Player.findByPk(playerId);
        return player;
    }

    async findPlayerByUserId(userId) {
        const player = await Player.findOne({ where: { userId: userId } });
        return player;
    }

    // Autres méthodes pour gérer les utilisateurs...
}

module.exports = new PlayerService();
