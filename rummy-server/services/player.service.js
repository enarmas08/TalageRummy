const Player = require('../models/player.model');
const { Op } = require('sequelize');

class PlayerService {

    /**
     * Crée un joueur dans la base de données.
     * @param {Player} playerData L'objet contenant les données du joueur à créer.
     * @returns {Promise<Player>} Le joueur créé.
     */
    async createPlayer(playerData) {
        const player = await Player.create(playerData);
        return player;
    }

    /**
     * Connecte ou déconnecte un joueur.
     * @param {number} userId L'identifiant de l'utilisateur associé au joueur.
     * @param {boolean} connect True pour connecter, false pour déconnecter.
     * @returns {Promise<[number]>} Le nombre de lignes affectées dans la base de données.
     */
    async connectOrDisconnectPlayer(userId, connect) {
        const player = await Player.update(
            { isConnect: connect },
            {
                where: { userId }
            }
        );
        return player;
    }

    /**
     * Déconnecte un joueur.
     * @param {number} playerId L'identifiant du joueur à déconnecter.
     * @returns {Promise<[number]>} Le nombre de lignes affectées dans la base de données.
     */
    async disconnectPlayer(playerId) {
        const player = await Player.update(
            { isConnect: false },
            {
                where: { id: playerId }
            }
        );
        return player;
    }

    /**
     * Recherche un joueur par son identifiant.
     * @param {number} playerId L'identifiant du joueur à rechercher.
     * @returns {Promise<Player|null>} Le joueur trouvé ou null s'il n'existe pas.
     */
    async findPlayerById(playerId) {
        const player = await Player.findByPk(playerId);
        return player;
    }

    /**
     * Recherche un joueur par l'identifiant de l'utilisateur associé.
     * @param {number} userId L'identifiant de l'utilisateur associé au joueur.
     * @returns {Promise<Player|null>} Le joueur trouvé ou null s'il n'existe pas.
     */
    async findPlayerByUserId(userId) {
        const player = await Player.findOne({ where: { userId } });
        return player;
    }

    /**
     * Retourne tous les joueurs connectés, à l'exception d'un joueur spécifié.
     * @param {number} excludeId L'identifiant du joueur à exclure de la recherche.
     * @returns {Promise<Player[]>} Un tableau de joueurs connectés.
     */
    async findAllPlayersConnected(excludeId) {
        const players = await Player.findAll({
            where: {
                isConnect: true,
                id: {
                    [Op.ne]: excludeId
                },
            }
        });
        return players;
    }

    // D'autres méthodes pour gérer les joueurs...

}

module.exports = new PlayerService();
