const express = require('express');
const { createTask, deleteTask, updateTask, getUserTasks } = require('../controllers/tasksController');

const router = express.Router();
//route vers le controller de création de tache
router.post('/create-task', createTask);

// route vers le controller qui récupère les taches
router.get('/get-tasks', getUserTasks);

//route vers le controller qui met à jour les taches 
router.put('/update-task/:id', updateTask);

//route vers le controller qui supprime les taches 
router.delete('/delete-task/:id', deleteTask);

module.exports = router;
