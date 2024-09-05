const Users = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Enregistrement de l'utilisateur
const usersRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
    }

    const user = await Users.create({ name, email, password });
    return res.status(201).json({ message: 'L\'utilisateur a bien été enregistré', user });

  } catch (error) {
    console.error('Erreur lors de l\'inscription', error);
    return res.status(400).json({ message: error.message });
  }
}

// Connexion de l'utilisateur
const usersLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'L\'utilisateur n\'existe pas' });
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
      message: 'L\'utilisateur a bien été connecté',
    });

  } catch (error) {
    console.error('Erreur lors de la connexion', error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { usersLogin, usersRegister };
