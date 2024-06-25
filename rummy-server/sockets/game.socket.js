const Player = require('../models/player.model');

module.exports = (io, socket) => {
    socket.on('joinGame', async ({ playerID }) => {
        try {
            console.log(`socket: ${socket.id}, player ${playerID} join the lobby  `)

        } catch (error) {
            socket.emit('error', { message: 'joinLobby : Something went wrong' });
        }
    });

};
