const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sequelize = require('./config/database'); // Chemin vers le fichier de configuration Sequelize
const CONST = require('./config/const');
const bodyParser = require('body-parser')
const cors = require('cors');

const routes = require("./routes");
const setupSockets = require('./sockets');

const app = express();
const server = http.createServer(app);

// Active CORS pour toutes les requêtes
app.use(cors());

const io = socketIo(server, {
    path: '/socket.enarmas',
    wssEngine: ['ws', 'wss'],
    transports: ['websocket', 'polling'],
    cors: {
        origin: CONST.URL_CLIENT, // URL d'application Angular
        methods: ["GET", "POST"]
    }
});

app.use(bodyParser.json()) // url parser for json objects

const PORT = process.env.PORT || 3000;

// Add routes
app.use(routes);

// Configurer les sockets
setupSockets(io);

// Fonction pour démarrer le serveur
async function startServer() {
    try {
        // Tester la connexion à la base de données
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // Synchronisation des modèles avec la base de données (créer les tables si elles n'existent pas)
        await sequelize.sync({ force: false }); // L'option { force: true } indique à Sequelize de recréer les tables chaque fois que l'application démarre
        console.log('Database synchronized.');

        // Démarrer le serveur Express, il faut pas utiliser app.listen parce qu'il va pas recevoir les ws connections
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

        process.on("exit", async () => {
            await sequelize.close();
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Appeler la fonction pour démarrer le serveur
startServer();
