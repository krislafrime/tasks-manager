import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data) => {
    setLoading(true);
    console.log(data)
    const handleLogin = async () =>{
      try {
        const response = await axios.post('http://localhost:4000/api/users/login',data);
        if (response.data.token) {
          localStorage.setItem('userInfo', JSON.stringify(response.data));
          navigate('/dashboard/manage-task'); 
        }
      } catch (error) {
        console.error('Erreur d\'authentification:', error);
        alert('Email ou mot de passe incorrect');
      }finally {
        setLoading(false);
      }
    }
    handleLogin();
    
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-8">Connexion</h1>
        <div className="flex  space-x-8">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="flex justify-between">
              <label className="text-primary-marineBlue font-[500] mb-2">E-mail</label>
              <span className={`${errors.email ? "inline" : "hidden"} text-primary-strawberryRed font-[500]`}>
                Ce champ est requis
              </span>
            </div>
            <input
              {...register('email', { required: true })}
              className={`${errors.email ? "w-full border-2 border-tomato bg-red-200  placeholder-tomato" : "w-full focus:outline-primary-marineBlue"} mb-6 outline outline-1 outline-neutral-lightGray rounded-[4px] p-3`}
              type="email"
              placeholder="E-mail "

            />


            <div className="flex justify-between">
              <label className="text-primary-marineBlue font-[500] mb-2">Mot de passe</label>
              <span className={`${errors.password ? "inline" : "hidden"} text-primary-strawberryRed font-[500]`}>
                Ce champ est requis
              </span>
            </div>
            <input
              {...register('password', { required: true })}
              className={`${errors.password ? "w-full border-2 border-tomato bg-red-200  placeholder-tomato" : "w-full focus:outline-primary-marineBlue"} mb-6 outline outline-1 outline-neutral-lightGray rounded-[4px] p-3`}
              type="password"
              placeholder="Mot de passe"
            />

            <button
              type="submit"
              className="mt-6 w-full p-2 bg-teal-700 text-white rounded-md hover:bg-teal-500"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>

    </>
  );
};

export default Login;