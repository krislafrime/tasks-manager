const Task = require('../models/tasksModel');

//recupération des taches par utilisateur
const getUserTasks = async (req, res) => {
  try {
    const { userId } = req.query;

    const tasks = await Task.find({ user: userId });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches', error);
    return res.status(400).json({ message: error.message });
  }
};

//création d'un tache
const createTask = async (req, res) => {
  try {
    const { userId,title, description, deadline } = req.body;
    // const {userId} = req.query; 

    const task = new Task({
      user: userId,
      title,
      description,
      deadline,
    });

    await task.save();

    return res.status(201).json({ message: 'Tâche créée avec succès', task });
  } catch (error) {
    console.error('Erreur lors de la création de la tâche', error);
    return res.status(400).json({ message: error.message });
  }
};

//mise à jour d'une tache
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const {userId} = req.query;
    const updates = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée ou non autorisée' });
    }

    return res.status(200).json({ message: 'Tâche mise à jour avec succès', task });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche', error);
    return res.status(400).json({ message: error.message });
  }
};

//suppression d'une tache
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const {userId} = req.query;
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée ou non autorisée' });
    }

    return res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche', error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
};
