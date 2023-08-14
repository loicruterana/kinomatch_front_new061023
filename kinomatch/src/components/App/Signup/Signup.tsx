// ================ IMPORT BIBLIOTHEQUES ================

import { useContext, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../../utils/config';

// ================ IMPORT CONTEXTS ================

import { AuthContext } from '../../../contexts/AuthContext';

// ================ IMPORT COMPOSANTS ================

import Connected from '../Connected/Connected';

// ================ IMPORT SCSS ================

import './Signup.scss';

//* ================ COMPOSANT ================

const Signup = () => {
  axios.defaults.withCredentials = true;

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
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [countPassword, setCountPassword] = useState(0);
  const [countPasswordConfirm, setCountPasswordConfirm] = useState(0);

  const [showPasswordConditions, setShowPasswordConditions] = useState(false);

  // usestate pour afficher ou masquer la version mobile
  const [mobileVersion, setMobileVersion] = useState(false);

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

  // ================ IMPORT PROPS CONTEXT ================

  const { userData, addUserData, login } = useContext(AuthContext);

  // ================ UTILS ================

  // fonction qui va permettre de rediriger vers la page d'accueil
  if (goToHomePage) {
    return <Navigate to='/' />;
  }

  // ================ HANDLERS ================

  // handleChange pour enregistrer les entrées dans les inputs du formulaire
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPostProfil({
      ...postProfil,
      [event.target.name]: value,
    });
    if (event.target.name === 'password') {
      setCountPassword(value.length);
    } else if (event.target.name === 'passwordConfirm') {
      setCountPasswordConfirm(value.length);
    }
  };

  //handleSubmit pour envoyer les données du formulaire au back
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowPasswordConfirm(false);
    setShowPassword(false);

    const userData = {
      email: postProfil.email,
      password: postProfil.password,
      passwordConfirm: postProfil.passwordConfirm,
    };
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, userData, {
        withCredentials: true,
      });
      // login(), va permettre de stocker dans AuhthContext = true;
      login();
      // setMessage pour afficher le message d'erreur
      setMessage(response.data.message);
      // addUserData pour stocker dans AuthContext les données de l'utilisateur
      addUserData(
        response.data.user.email,
        response.data.user.id,
        response.data.user.picture
      );

      setTimeout(() => {
        setGoToHomePage(true);
      }, 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      if (error.response.status === 400) {
        //Email et mot de passe obligatoires
        //Email ou mot de passe invalide
        console.log(error.response.data.error);
        setMessage(error.response.data.error);
        return;
      }

      if (error.response.status === 500) {
        //Erreur lors de la connexion de l'utilisateur
        console.log(error.response.data.error);
        setMessage(error.response.data.error);
        return;
      }
    }
  };

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleShowPasswordConfirm() {
    setShowPasswordConfirm(!showPasswordConfirm);
  }

  // ============ JSX ============

  return (
    <main className='Signup-container'>
      {/* formulaire d'inscription */}
      <form className='Signup-container-form' onSubmit={handleSubmit}>
        {/* Champ pour l'email */}
        <label htmlFor='email'>Votre email</label>
        <input
          onChange={handleChange}
          className='Signup-container-form-input'
          type='email'
          id='email'
          name='email'
          required
          placeholder='votre@email.com'
          aria-label='Votre email'
        />
        {/* Champ pour le mot de passe */}
        <label htmlFor='password'>Votre mot de passe</label>
        <div className='Signup-container-form-input-inputgroup'>
          {!mobileVersion && (
            <i
              className='fa-solid fa-info Signup-container-form-input-inputgroup-i'
              onMouseOver={() => setShowPasswordConditions(true)}
              onMouseLeave={() => setShowPasswordConditions(false)}
            ></i>
          )}
          {mobileVersion && (
            <i
              className='fa-solid fa-info Signup-container-form-input-inputgroup-i'
              onClick={() => setShowPasswordConditions(!showPasswordConditions)}
            ></i>
          )}
          {showPasswordConditions && (
            <div className='Signup-container-form-input-conditions'>
              <p>12 caractères minimum</p>
              <p>1 caractère spécial</p>
              <p>1 majuscule</p>
              <p>1 chiffre</p>
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
            className='Signup-container-form-input'
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            required
            placeholder='v0tr3MdP1c1'
            aria-label='Votre mot de passe'
          />
          <span className='Signup-container-form-input-inputgroup-count'>
            {countPassword > 1 && countPassword}
          </span>
        </div>
        {/* Champ pour confirmer le mot de passe */}
        <label htmlFor='passwordConfirm'>Confirmez votre mot de passe</label>
        <div className='Signup-container-form-input-inputgroup'>
          <i
            className={
              !showPasswordConfirm
                ? 'fa-solid fa-eye login-container-form-input-inputgroup-eye'
                : 'fa-solid fa-eye-slash login-container-form-input-inputgroup-eye-slash'
            }
            onClick={handleShowPasswordConfirm}
          ></i>
          <input
            onChange={handleChange}
            className='Signup-container-form-input'
            type={showPasswordConfirm ? 'text' : 'password'}
            id='passwordConfirm'
            name='passwordConfirm'
            required
            placeholder='v0tr3MdP1c1'
            aria-label='Confirmez votre mot de passe'
          />
          <span className='Signup-container-form-input-inputgroup-count'>
            {countPasswordConfirm > 1 && countPasswordConfirm}
          </span>
        </div>

        {/* Lien vers la page de connexion */}
        <Link key='login' to='/login'>
          <span className='new-account'>Vous avez déjà un compte ?</span>
        </Link>
        {/* Bouton de soumission */}
        <button type='submit' aria-label='Créer compte'>
          Créer compte
        </button>
        {/* Message */}
        <p className='Login-container__message' aria-live='polite'>
          {message}
        </p>
      </form>
      {userData.email && <Connected />}
    </main>
  );
  //* ================ FERMETURE COMPOSANT ================
};

export default Signup;
