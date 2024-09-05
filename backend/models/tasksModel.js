const mongoose = require('mongoose');

//modèle des utilisateur
const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date },
  isCompleted: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
