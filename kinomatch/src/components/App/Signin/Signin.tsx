import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";


// import HCaptcha from '@hcaptcha/react-hcaptcha';

import './Signin.scss';

export const Signin = () => {
  const [postProfil, setPostProfil] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [isConnected, setIsConnected] = useState(false);

  const [goToHomePage, setGoToHomePage] = React.useState(false);

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

  // const handleVerificationSuccess = (token, ekey) => {
  //   // Faire quelque chose avec le token
  //   console.log(token);
  // };

  const handleSubmit = (event) => {
    const userData = {
      email: postProfil.email,
      password: postProfil.password,
      passwordConfirm: postProfil.passwordConfirm,

    };
    try{
      axios.post('http://localhost:4000/signin', userData).then((response) => {
      console.log(response.status, response.data.token);
    });
  }catch{
    console.log('error')
    return
  }
  event.preventDefault();
  setIsConnected(true);
  setGoToHomePage(true);
  };

  return (
    <div className='Signin-container'>
      <form
        className='CreateProfile-container-form'
        onSubmit={handleSubmit}
        // action="http://localhost:4000/signup" //à modifier
        // method="POST"
      >
        <label htmlFor='email'>Votre email</label>
        <input
          onChange={handleChange}
          className='Signin-container-form-input'
          type='email'
          id='email'
          name='email'
          required
          placeholder='votre@email.com'
        />
        <label htmlFor='password'>Votre mot de passe</label>
        <input
          onChange={handleChange}
          className='CreateProfile-container-form-input'
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
        <button type='submit'>CONNEXION</button>
      </form>
    </div>
  );
};

export default Signin;

