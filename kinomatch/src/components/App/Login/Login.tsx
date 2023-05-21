import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { EmailContext } from '../../../contexts/EmailContext';
import { AuthContext } from '../../../contexts/AuthContext';
import Connected from '../Connected/Connected';


// import HCaptcha from '@hcaptcha/react-hcaptcha';

import './Login.scss';

export const Login = () => {

  const [postProfil, setPostProfil] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { addEmail, email } = useContext(EmailContext);
  const { isLoggedIn, login } = useContext(AuthContext);

  const [goToHomePage, setGoToHomePage] = useState(false);
  const [error, setError] = useState('');

  if (goToHomePage) {
    return <Navigate to="/" />;
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setPostProfil({
      ...postProfil,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: postProfil.email,
      password: postProfil.password,
    };

    axios.post('https://deploy-back-kinomatch.herokuapp.com/login', userData)
      .then((response) => {
        console.log(response.status, response.data.token);

        // Check if there is an error returned by the back
        if(response.data !== undefined) {
          console.log(response.data);
          // error
          return;
        }

        if(response.status === 500) {
          console.log(response.data);
          // error
          return;
        }

        // OK

        addEmail(postProfil.email)
        login();
        setTimeout(() => {
          setGoToHomePage(true);
        }, 1500);
      })
      .catch((error) => {
        console.log(error)
        console.log('Response data:', error.response.data.error);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);    
      });

  };

  return (
    <div className='Login-container'>
      <form
        className='Login-container-form'
        onSubmit={handleSubmit}
        // action="http://localhost:4000/signup" //à modifier
        // method="POST"
      >
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

        
        {/* <HCaptcha
        sitekey="7089290a-26a0-4d4d-8124-cfbe1a2c3b8a"
        onVerify={(token,ekey) => handleVerificationSuccess(token, ekey)}
        />         */}

      <Link key='signup' to='/signup'>
          <aside className='new-account'>Vous n'avez pas encore de compte ?</aside>
        </Link>

        <button type='submit'>Connexion</button>

      </form>
      {isLoggedIn && <Connected email={email}/>}

    </div>
  );
};

export default Login;

