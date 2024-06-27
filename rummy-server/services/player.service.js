const Player = require('../models/player.model');
const { Op } = require('sequelize');

class PlayerService {

    /**
     * Cr�e un joueur dans la base de donn�es.
     * @param {Player} playerData L'objet contenant les donn�es du joueur � cr�er.
     * @returns {Promise<Player>} Le joueur cr��.
     */
    async createPlayer(playerData) {
        const player = await Player.create(playerData);
        return player;
    }

    /**
     * Connecte ou d�connecte un joueur.
     * @param {number} userId L'identifiant de l'utilisateur associ� au joueur.
     * @param {boolean} connect True pour connecter, false pour d�connecter.
     * @returns {Promise<[number]>} Le nombre de lignes affect�es dans la base de donn�es.
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
     * D�connecte un joueur.
     * @param {number} playerId L'identifiant du joueur � d�connecter.
     * @returns {Promise<[number]>} Le nombre de lignes affect�es dans la base de donn�es.
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
     * @param {number} playerId L'identifiant du joueur � rechercher.
     * @returns {Promise<Player|null>} Le joueur trouv� ou null s'il n'existe pas.
     */
    async findPlayerById(playerId) {
        const player = await Player.findByPk(playerId);
        return player;
    }

    /**
     * Recherche un joueur par l'identifiant de l'utilisateur associ�.
     * @param {number} userId L'identifiant de l'utilisateur associ� au joueur.
     * @returns {Promise<Player|null>} Le joueur trouv� ou null s'il n'existe pas.
     */
    async findPlayerByUserId(userId) {
        const player = await Player.findOne({ where: { userId } });
        return player;
    }

    /**
     * Retourne tous les joueurs connect�s, � l'exception d'un joueur sp�cifi�.
     * @param {number} excludeId L'identifiant du joueur � exclure de la recherche.
     * @returns {Promise<Player[]>} Un tableau de joueurs connect�s.
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

    // D'autres m�thodes pour g�rer les joueurs...

}

module.exports = new PlayerService();
