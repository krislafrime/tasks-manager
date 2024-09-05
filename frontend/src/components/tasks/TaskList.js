import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfo._id;
  
  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      // Si l'utilisateur n'est pas authentifié, redirigez vers la page de connexion
      navigate('/login');
    } else {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/tasks/get-tasks`, {
          params: { userId }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    };

    fetchTasks();
  }
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/delete-task/${taskId}`, {
        params: { userId }
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/tasks/update-task/${taskId}`, updates, {
        params: { userId }
      });
      setTasks(tasks.map((task) => (task._id === taskId ? response.data.task : task)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestionnaire de tâches</h1>

      <Link to={'/dashboard/new-task'} className="text-tel-900 mr-4 mb-5 text-xl bg-gray-400 rounded-sm p-1">Crée une nouvelle tache</Link>
      
      {/* Vérifier s'il y a des tâches à afficher */}
      {tasks.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100">Titre</th>
              <th className="py-2 px-4 bg-gray-100">Description</th>
              <th className="py-2 px-4 bg-gray-100">Date limite</th>
              <th className="py-2 px-4 bg-gray-100">Statut</th>
              <th className="py-2 px-4 bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className="border px-4 py-2">{task.title}</td>
                <td className="border px-4 py-2">{task.description}</td>
                <td className="border px-4 py-2">{new Date(task.deadline).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{task.isCompleted ? 'Complétée' : 'Non complétée'}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleUpdateTask(task._id, { isCompleted: !task.isCompleted })}
                    className={`py-1 px-2 rounded ${task.isCompleted ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
                  >
                    {task.isCompleted ? 'Marquer non complétée' : 'Marquer complétée'}
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="ml-2 py-1 px-2 bg-red-500 text-white rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Aucune tâche disponible pour le moment.</p>
      )}
    </div>
  );
};

export default TaskList;
