const jwt = require('jsonwebtoken');
const CONST = require('../config/const');
const authenticateToken = require('../middleware/authSocketMiddleware');


const gameSocket = require('./game.socket');
const lobbySocket = require('./lobby.socket');

const Game = require('../models/game.model');
const Player = require('../models/player.model');
const Room = require('../models/room.model');

module.exports = (io) => {

    io.use(authenticateToken);

    io.on('connection', (socket) => {
        console.log('Nouvelle connexion WebSocket établie:', socket.id);

        gameSocket(io, socket);
        lobbySocket(io, socket);

        socket.on('disconnect', () => {
            console.log('Déconnexion WebSocket:', socket.id);
        });
    });

    io.engine.on("connection_error", (err) => {
        console.log(err.req);      // the request object
        console.log(err.code);     // the error code, for example 1
        console.log(err.message);  // the error message, for example "Session ID unknown"
        console.log(err.context);  // some additional error context
    });
};
