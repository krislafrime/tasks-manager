const express = require('express');
const router = express.Router();
const {usersRegister,usersLogin} = require('../controllers/usersController');

//route vers le controller d'enregistrement des utilisateurs
router.post('/register',usersRegister);

//route vers le controller de connexion des utilisateurs
router.post('/login',usersLogin);

module.exports = router ;