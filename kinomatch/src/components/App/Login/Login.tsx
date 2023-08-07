// ================ IMPORT BIBLIOTHEQUES ================

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../../utils/config';

// ================ IMPORT CONTEXTS ================

import { AuthContext } from '../../../contexts/AuthContext';

// ================ IMPORT COMPOSANTS ================

import Connected from '../Connected/Connected';

// ================ IMPORT SCSS ================

import './Login.scss';

//* ================ COMPOSANT ================

export const Login = () => {
  axios.defaults.withCredentials = true;

  // ================ IMPORT PROPS CONTEXTS ================

  const { userData, addUserData, login } = useContext(AuthContext);
  //
  // ================ USESTATE ================

  // state qui va recevoir les données du formulaire
  const [postProfil, setPostProfil] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  // state pour la redirection vers la page d'accueil
  const [goToHomePage, setGoToHomePage] = useState(false);
  // state pour afficher un message d'erreur
  const [message, setMessage] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [countPassword, setCountPassword] = useState(0);

  const [showPasswordConditions, setShowPasswordConditions] = useState(false);

  // ================ UTILS ================

  // fonction qui va permettre de rediriger vers la page d'accueil
  if (goToHomePage) {
    return <Navigate to='/' />;
  }

  // ================ HANDLERS ================

  // handleChange pour enregistrer les entrées dans les inputs du formulaire
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setPostProfil({
      ...postProfil,
      [event.target.name]: value,
    });
    if (event.target.name === 'password') {
      setCountPassword(value.length);
    }
  };

  //handleSubmit pour envoyer les données du formulaire pour se logger
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setShowPassword(false);
    const userData = {
      email: postProfil.email,
      password: postProfil.password,
    };
    console.log(userData);

    axios
      .post(`${API_BASE_URL}/login`, userData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setMessage(response.data.message);
          addUserData(
            response.data.user.email,
            response.data.user.id,
            response.data.user.picture
          );
          login();
          setTimeout(() => {
            setGoToHomePage(true);
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(error);

        if (error.response.status === 400) {
          //Email et mot de passe obligatoires
          //Email ou mot de passe invalide
          console.log(error.response.data.error);
          setMessage(error.response.data.error);
          return;
        }

        if (error.response.status === 500) {
          //Erreur lors de la connexion de l\'utilisateur
          console.log(error.response.data.error);
          setMessage(error.response.data.error);
          return;
        }
      });
  };

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  // ================ JSX ================
  return (
    <main className='login-container'>
      {/* formulaire de connexion */}
      <form className='login-container-form' onSubmit={handleSubmit}>
        {/* Champ pour l'email */}
        <label htmlFor='email'>Votre email</label>
        <input
          onChange={handleChange}
          className='login-container-form-input'
          type='email'
          id='email'
          name='email'
          placeholder='votre@email.com'
          aria-label='Votre email'
          required
        />

        {/* Champ pour le mot de passe */}

        <label htmlFor='password'>Votre mot de passe</label>
        <i
          className='fa-solid fa-info'
          onMouseOver={() => setShowPasswordConditions(true)}
          onMouseLeave={() => setShowPasswordConditions(false)}
        ></i>

        {showPasswordConditions && (
          <div className='login-container-form-input-conditions'>
            voici les conditions
          </div>
        )}
        <i
          className={
            !showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
          }
          onClick={handleShowPassword}
        ></i>

        <input
          onChange={handleChange}
          className='login-container-form-input'
          type={showPassword ? 'text' : 'password'}
          id='password'
          name='password'
          placeholder='v0tr3MdP1c1'
          aria-label='Votre mot de passe'
          required
        />
        <span>{countPassword > 1 && countPassword}</span>

        {/* Lien vers la page d'inscription */}
        <Link key='signup' to='/signup'>
          <span className='new-account'>
            Vous n'avez pas encore de compte ?
          </span>
        </Link>

        {/* Bouton de soumission */}
        <button type='submit' aria-label='Connexion'>
          Connexion
        </button>

        {/* Message */}
        <p className='login-container__message' aria-live='polite'>
          {message}
        </p>
      </form>
      {userData.email && <Connected />}
    </main>
  );
  //* ================ FERMETURE COMPOSANT ================
};

export default Login;
