const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//schema des utilisateurs
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

// vérification du mot de passe crypter
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//cryptage du mot de passe avant enregistrement
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Users = mongoose.model('users',userSchema)

module.exports = Users;