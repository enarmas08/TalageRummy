const Player = require('../models/player.model');

module.exports = (io, socket) => {

    let mainRoom = "lobbyRoom";

    socket.on('joinLobby', async (player) => {
        try {
            socket.join(mainRoom);
            console.log(`Socket ${socket.id} joined room ${mainRoom} Player(${player.id})`);
            socket.broadcast.to(mainRoom).emit('playerAdded', player);

        } catch (error) {
            socket.emit('error', { from: 'lobby.socket.js (joinLobby)', error });
        }
    });

    socket.on('leaveLobby', async (playerId) => {
        try {
            socket.leave(mainRoom);
            console.log(`Socket ${socket.id} left room ${mainRoom} Player(${playerId})`);
            socket.broadcast.to(mainRoom).emit('playerDeleted', playerId);

        } catch (error) {
            socket.emit('error', { from: 'lobby.socket.js (exitLobby)', error });
        }
    });

};
