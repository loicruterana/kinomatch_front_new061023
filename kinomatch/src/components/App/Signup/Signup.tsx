// ================ IMPORT BIBLIOTHEQUES ================

import { useContext, useState, ChangeEvent, FormEvent } from 'react';
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
  };

  //handleSubmit pour envoyer les données du formulaire au back
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      addUserData(response.data.user.email, response.data.user.id);

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
        <input
          onChange={handleChange}
          className='Signup-container-form-input'
          type='password'
          id='password'
          name='password'
          required
          placeholder='v0tr3MdP1c1'
          aria-label='Votre mot de passe'
        />

        {/* Champ pour confirmer le mot de passe */}
        <label htmlFor='passwordConfirm'>Confirmez votre mot de passe</label>
        <input
          onChange={handleChange}
          className='Signup-container-form-input'
          type='password'
          id='passwordConfirm'
          name='passwordConfirm'
          required
          placeholder='v0tr3MdP1c1'
          aria-label='Confirmez votre mot de passe'
        />

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
