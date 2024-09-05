import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
const TaskForm = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [tasks, setTasks] = useState([]);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      userId: userInfo._id,
      title: "",
      description: "",
      deadline: "",
    },
  });
  const [loading, setLoading] = useState(false);


  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/tasks/create-task', data,);
      setTasks([...tasks, response.data.task]);
      reset();
    } catch (error) {
      console.error('Erreur lors de la création de la tâche:', error);
    } finally {
      setLoading(false);
    }
  };
  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Link to={'/dashboard/manage-task'} className="text-tel-900 mr-4 mb-5 text-xl bg-gray-400 rounded-sm p-1">Visionner les taches</Link>

      <h1 className="text-2xl font-bold mb-8">Crée une nouvelle tache</h1>
      <div className="flex  space-x-8">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8 p-4 bg-white shadow-md rounded">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la tâche</label>
            <input
              type="text"
              {...register('title', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Titre de la tâche"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              {...register('description')}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Description"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date limite</label>
            <input
              type="date"
              {...register('deadline')}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Création...' : 'Créer une tâche'}
          </button>
        </form>
      </div>
    </div>

  );
};

export default TaskForm;