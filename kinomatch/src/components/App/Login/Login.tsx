// ================ IMPORT BIBLIOTHEQUES ================

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../../utils/config';
import { useNavigate } from 'react-router-dom';

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

  const [showPseudoConditions, setShowPseudoConditions] = useState(false);
  // usestate pour afficher ou masquer la version mobile
  const [mobileVersion, setMobileVersion] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData.email !== '') {
      const timeoutId = setTimeout(() => {
        // Utilisez l'objet d'historique pour rediriger l'utilisateur vers la page d'accueil après 1 seconde
        navigate('/');
      }, 1000);

      // Assurez-vous d'annuler le timeout si le composant est démonté avant l'expiration du délai
      return () => clearTimeout(timeoutId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.email, history]);

  //======== USEWINDOWSIZE

  // la taille de l'écran définit l'affichage des filtres
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 900) {
        setMobileVersion(false);
      }
      if (window.innerWidth < 900) {
        setMobileVersion(true);
      }
    }

    window.addEventListener('resize', handleResize);
    // ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
    // un removeEventListener pour éviter les fuites de mémoire
    // on risque  d'enregistrer plusieurs écouteurs pour le même événement et créer des fuites mémoires
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem('userData')) {
  //     setTimeout(() => {
  //       return <Navigate to='/' />;
  //     }, 1000);
  //   }
  // }, []);

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
          // localStorage.setItem(
          //   'userData',
          //   JSON.stringify({
          //     email: response.data.user.email,
          //     id: response.data.user.id,
          //     picture: response.data.user.picture,
          //   })
          // );

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
        <label htmlFor='email'>Votre pseudo</label>

        <div className='login-container-form-input-inputgroup'>
          {!mobileVersion && (
            <i
              className='fa-solid fa-info login-container-form-input-inputgroup-i'
              onMouseOver={() => setShowPseudoConditions(true)}
              onMouseLeave={() => setShowPseudoConditions(false)}
            ></i>
          )}
          {mobileVersion && (
            <i
              className='fa-solid fa-info login-container-form-input-inputgroup-i'
              onClick={() => setShowPseudoConditions(!showPasswordConditions)}
            ></i>
          )}

          
        <input
          onChange={handleChange}
          className='login-container-form-input'
          // type='email'
          // id='email'
          name='email'
          placeholder='votrepseudo'
          aria-label='Votre email'
          required
        />
        </div>

        {/* Champ pour le mot de passe */}

        <label htmlFor='password'>Votre mot de passe</label>

        <div className='login-container-form-input-inputgroup'>
          {!mobileVersion && (
            <i
              className='fa-solid fa-info login-container-form-input-inputgroup-i'
              onMouseOver={() => setShowPasswordConditions(true)}
              onMouseLeave={() => setShowPasswordConditions(false)}
            ></i>
          )}
          {mobileVersion && (
            <i
              className='fa-solid fa-info login-container-form-input-inputgroup-i'
              onClick={() => setShowPasswordConditions(!showPasswordConditions)}
            ></i>
          )}

          {showPasswordConditions && (
            <div className='login-container-form-input-conditions'>
              <p>12 caractères minimum</p>
              <p>1 caractère spécial</p>
              <p>1 majuscule</p>
              <p>1 chiffre</p>
            </div>
          )}

          {showPseudoConditions && (
            <div className='login-container-form-input-conditions2'>
              <p>Le site étant en cours de développement, nous vous demandons seulement un pseudo afin de ne pas recueillir vos données personnelles type email.
              </p>
            </div>
          )}

          <i
            className={
              !showPassword
                ? 'fa-solid fa-eye login-container-form-input-inputgroup-eye'
                : 'fa-solid fa-eye-slash login-container-form-input-inputgroup-eye-slash'
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
          <span className='login-container-form-input-inputgroup-count'>
            {countPassword > 1 && countPassword}
          </span>
        </div>
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
