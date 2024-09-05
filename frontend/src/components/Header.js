import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {


  return (
    <header className="bg-gray-800 p-4  w-full">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">Gestionnaire de taches</Link>
        <div>
          <Link to="/login" className="text-white mr-4">Connexion</Link>
          <Link to="/register" className="bg-teal-700 text-white px-3 py-1 rounded">Inscription</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
