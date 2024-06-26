const express = require('express');
const UserController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout/:id', UserController.logout);
router.get('/:id', UserController.getUser);

// Autres routes pour les utilisateurs...

module.exports = router;
