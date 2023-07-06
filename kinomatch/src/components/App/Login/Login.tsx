// ================ IMPORT BIBLIOTHEQUES ================

import React, { useState, useEffect, useContext } from 'react';
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

  // function getCookie(name) {
  //   const cookieString = document.cookie;
  //   const cookies = cookieString.split(';');

  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i].trim();

  //     if (cookie.startsWith(name + '=')) {
  //       return cookie.substring(name.length + 1);
  //     }
  //   }

  //   return null;
  // }

  // useEffect(() => {
  //   const monCookie = getCookie('userToken');

  //   if (monCookie) {
  //     console.log('Valeur du cookie :', monCookie);
  //     // Faites quelque chose avec la valeur du cookie...

  //     axios
  //       .get(`${API_BASE_URL}/login/${monCookie}`)
  //       .then((response) => {
  //         const data = response.data;
  //         console.log('Valeurs récupérées du backend :', data);

  //         // Faites quelque chose avec les valeurs récupérées
  //         // Par exemple, mettez à jour l'état du composant avec les données reçues
  //         // addUserData(userEmail, userId);
  //         // login();
  //         // setGoToHomePage(true);
  //       })
  //       .catch((error) => {
  //         console.log(`${API_BASE_URL}/login/${monCookie}`);
  //         console.log(
  //           'Erreur lors de la récupération des valeurs depuis le backend :',
  //           error
  //         );
  //         // Gérez l'erreur de la requête si nécessaire
  //       });
  //   } else {
  //     console.log("Le cookie n'existe pas");
  //   }
  // }, []);

  // //test
  // useEffect(() => {
  //   axios.get(`${API_BASE_URL}/login`).then((response) => {
  //     console.log(response);
  //   });
  // }, []);

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

  useEffect(() => {
    // Vérifier si les données de connexion existent dans le localStorage
    const userEmail = localStorage.getItem('userEmail');
    const userId = localStorage.getItem('userId');

    if (userEmail && userId) {
      addUserData(userEmail, userId);
      login();
      setGoToHomePage(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ================ UTILS ================

  // const email = useRef<HTMLInputElement>(null);
  // const password = useRef<HTMLInputElement>(null);

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
  };

  //handleSubmit pour envoyer les données du formulaire pour se loger
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
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
          addUserData(response.data.user.email, response.data.user.id);
          setGoToHomePage(true);
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

  // ================ JSX ================
  return (
    <main className='Login-container'>
      {/* formulaire de connexion */}
      <form className='Login-container-form' onSubmit={handleSubmit}>
        <label htmlFor='email'>Votre email</label>
        <input
          onChange={handleChange}
          className='Login-container-form-input'
          type='email'
          id='email'
          name='email'
          required
          placeholder='votre@email.com'
        />
        <label htmlFor='password'>Votre mot de passe</label>
        <input
          onChange={handleChange}
          className='Login-container-form-input'
          type='password'
          id='password'
          name='password'
          required
          placeholder='v0tr3MdP1c1'
        />

        <Link key='signup' to='/signup'>
          <span className='new-account'>
            Vous n'avez pas encore de compte ?
          </span>
        </Link>

        <button type='submit'>Connexion</button>
        <p className='Login-container__message'>{message}</p>
      </form>
      {userData.email && <Connected />}
    </main>
  );
  //* ================ FERMETURE COMPOSANT ================
};

export default Login;
