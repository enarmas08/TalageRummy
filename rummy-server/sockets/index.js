const jwt = require('jsonwebtoken');
const CONST = require('../config/const');
const authenticateToken = require('../middleware/authSocketMiddleware');
const playerService = require('../services/player.service');

const gameSocket = require('./game.socket');
const lobbySocket = require('./lobby.socket');

const Player = require('../models/player.model');

/** 
 * Trouve l'identifiant du joueur à partir de l'identifiant du socket.
 * @param {string} socketId L'identifiant du socket.
 * @returns {string|null} L'identifiant du joueur correspondant ou null s'il n'est pas trouvé.
 */
function findPlayerIdBySocketId(socketId) {
    // Parcourir chaque clé de activePlayers
    for (let playerId in activePlayers) {
        // Vérifier si le socketId correspond
        if (activePlayers[playerId].socketId === socketId) {
            return playerId; // Retourne le playerId correspondant
        }
    }
    return null; // Retourne null si aucun playerId correspondant n'est trouvé
}

const activePlayers = {};

module.exports = (io) => {

    io.use(authenticateToken);

    io.on('connection', (socket) => {
        console.log('Nouvelle connexion WebSocket établie:', socket.id);

        socket.on('associePlayerWithSocketId', async (playerId) => {
            try {
                // Associe l'identifiant du joueur avec l'identifiant du socket actuel
                activePlayers[playerId] = {
                    socketId: socket.id,
                };

                console.log('activeSessions:', JSON.stringify(activePlayers));
            } catch (error) {
                socket.emit('error', { from: 'sockets/index.js (associePlayerWithSocketId)', error });
            }
        });

        // Initialise les sockets
        gameSocket(io, socket);
        lobbySocket(io, socket, activePlayers);

        socket.on('disconnect', () => {
            try {
                console.log('Déconnexion WebSocket:', socket.id);

                // Trouve l'identifiant du joueur associé au socket qui se déconnecte
                const playerId = findPlayerIdBySocketId(socket.id);

                // Supprime l'entrée correspondante dans activePlayers
                delete activePlayers[playerId];

                // Déconnecte le joueur dans la base de données
                playerService.disconnectPlayer(Number(playerId));

                console.log('activeSessions:', JSON.stringify(activePlayers));
            } catch (error) {
                socket.emit('error', { from: 'sockets/index.js (disconnect)', error });
            }
        });
    });

    // Gestion des erreurs de connexion
    io.engine.on("connection_error", (err) => {
        console.log(err.req);      // l'objet de la requête
        console.log(err.code);     // le code d'erreur, par exemple 1
        console.log(err.message);  // le message d'erreur, par exemple "Session ID unknown"
        console.log(err.context);  // contexte d'erreur supplémentaire
    });
};
