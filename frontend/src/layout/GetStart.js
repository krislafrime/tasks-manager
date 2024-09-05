import React from 'react';
import { useNavigate } from 'react-router-dom';

const GetStart = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-2xl font-bold mb-8">BIENVENUE SUR VOTRE GESTIONNAIRE DE TACHES</h1>
    <div className="flex  space-x-8">
      <div
        onClick={() => navigate('/register')}
        className="cursor-pointer bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 w-[100%]"
      >
        <img
          src="/banner.jpg"
          alt="banniere"
          className="w-40 h-40 object-cover mx-auto mb-4"
        />
        <h2 className="text-center text-xl font-semibold">Commencer</h2>
      </div>
    </div>
  </div>
  );
};

export default GetStart;