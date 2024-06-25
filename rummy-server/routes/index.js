
const router = require("express").Router();
const apiRoutes = require("./api");
const authenticateToken = require('../middleware/authAPIMiddleware');
const UserController = require('./../controllers/user.controller');

//je l'ai déclarer ici exceptionnelment parceque il faut pas appliquer le middleware sur ce deux route
router.post('/api/users/register', UserController.register);
router.post('/api/users/login', UserController.login);

// Appliquez le middleware authenticateToken à toutes les routes ci-dessous (il faut laisser que le route register et le route login en haut pour appliquer le middleware pour tout le reste de routes définies après)
router.use(authenticateToken);

// API FOR ALL Routes
router.use("/api", apiRoutes);

router.get('/', (req, res) => {
    res.send('Hello, Rummy Server is up and running!');
});

// Middleware pour gérer les erreurs de route non trouvée
router.use((req, res, next) => {
    if (!req.originalUrl.startsWith('/socket')) {
        res.status(404).json({ message: 'Route not found' });
    } else {
        next();
    }
});
  
// Middleware pour gérer les erreurs globales
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});


module.exports = router;
