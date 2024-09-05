import React from 'react';
import { Link } from 'react-router-dom';
const HeaderDashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  console.log("user info",userInfo)
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  return (
    <header className="bg-gray-800 p-4  w-full">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">Gestionnaire de taches</Link>
        {userInfo ? ( <span className="text-white mr-4">Bonjour {userInfo.name}</span>):('')}
        <div>
          {userInfo ? (
            <>
              
              <Link to={'/dashboard/new-task'} className="text-white mr-4">Nouvelle tache</Link>
              <Link to={'/dashboard/manage-task'} className="text-white mr-4">Liste des taches</Link>
              <button onClick={logoutHandler} className="bg-red-500 text-white px-3 py-1 rounded">Se deconnecter</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">Connexion</Link>
              <Link to="/register" className="bg-teal-700 text-white px-3 py-1 rounded">Inscription</Link>
              
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default HeaderDashboard;