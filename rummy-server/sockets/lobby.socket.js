const Player = require('../models/player.model');

module.exports = (io, socket, activePlayers) => {

    let mainRoom = "lobbyRoom";

    /**
     * G�re l'�v�nement de connexion d'un joueur au lobby.
     * @param {Player} player Le joueur qui rejoint le lobby.
     */
    socket.on('joinLobby', async (player) => {
        try {
            socket.join(mainRoom);
            console.log(`Socket ${socket.id} joined room ${mainRoom} Player(${player.id})`);
            socket.broadcast.to(mainRoom).emit('playerAdded', player);
        } catch (error) {
            socket.emit('error', { from: 'lobby.socket.js (joinLobby)', error });
        }
    });

    /**
     * G�re l'�v�nement de d�connexion d'un joueur du lobby.
     * @param {number} playerId L'identifiant du joueur qui quitte le lobby.
     */
    socket.on('leaveLobby', async (playerId) => {
        try {
            socket.leave(mainRoom);
            console.log(`Socket ${socket.id} left room ${mainRoom} Player(${playerId})`);
            socket.broadcast.to(mainRoom).emit('playerDeleted', playerId);
        } catch (error) {
            socket.emit('error', { from: 'lobby.socket.js (leaveLobby)', error });
        }
    });

    /**
     * G�re l'�v�nement d'envoi d'une invitation.
     * @param invitation L'invitation envoy�e.
     */
    socket.on('invitation:send-request', async (invitation) => {
        try {
            const socketId = activePlayers[invitation.toPlayer.id].socketId;
            io.to(socketId).emit('invitation:receive-request', invitation);
        } catch (error) {
            socket.emit('error', { from: 'lobby.socket.js (invitation:send-request)', error });
        }
    });

    /**
     * G�re l'�v�nement de r�ponse � une invitation.
     * @param response La r�ponse � l'invitation.
     */
    socket.on('invitation:send-response', async (response) => {
        try {
            const socketId = activePlayers[response.toPlayerId].socketId;
            io.to(socketId).emit('invitation:receive-response', response);
        } catch (error) {
            socket.emit('error', { from: 'lobby.socket.js (invitation:send-response)', error });
        }
    });

};
