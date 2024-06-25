const Game = require('../models/game.model');
const Player = require('../models/player.model');
const Room = require('../models/room.model');

module.exports = (io, socket) => {

    let mainRoom = "lobbyRoom";

    socket.on('joinLobby', async () => {
        try {
            socket.join(mainRoom);
            console.log(`Socket ${socket.id} joined room ${mainRoom}`);
            io.to(mainRoom).emit('message', `User ${socket.id} has joined the room ${mainRoom}`);

        } catch (error) {
            socket.emit('error', { from: 'lobby.socket.js (joinLobby)', error });
        }
    });

    socket.on('leaveLobby', async () => {
        try {
            socket.leave(mainRoom);
            console.log(`Socket ${socket.id} left room ${mainRoom}`);
            io.to(mainRoom).emit('message', `User ${socket.id} has left the room ${mainRoom}`);

        } catch (error) {
            socket.emit('error', { from: 'lobby.socket.js (exitLobby)', error });
        }
    });

};
