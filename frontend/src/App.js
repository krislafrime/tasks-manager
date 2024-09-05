import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import GetStart from './layout/GetStart';
import Register from './layout/Register';
import Login from './layout/Login';
import './style/index.css'
import HeaderDashboard from './components/HeaderDashboard';
import TaskForm from './components/tasks/TaskForm';
import TaskList from './components/tasks/TaskList';


function App() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));


  // function ProtectedRoute({ children }) {

  //   if (!userInfo) {
  //     // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  //     return <Navigate to="/login" replace />;
  //   }

  //   return children;
  // }



  return (
    <Router>
      {userInfo ? (<HeaderDashboard />) : (<Header />)}
      <main>
        <Routes>
          <Route path="/" element={<GetStart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/new-task" element={<TaskForm />}/>
          <Route path="/dashboard/manage-task" element={<TaskList />}/>
          {/* <Route path="/dashboard/new-task" element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/manage-task" element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          } /> */}

        </Routes>
      </main>
    </Router>
  );
}

export default App;
