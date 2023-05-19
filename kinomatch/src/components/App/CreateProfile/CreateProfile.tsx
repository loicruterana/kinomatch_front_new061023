import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Connected from '../Connected/Connected';
import { EmailContext } from '../../../contexts/EmailContext';


import './CreateProfile.scss';

const CreateProfile = () => {
  const [postProfil, setPostProfil] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { isLoggedIn, login } = useContext(AuthContext);
  const { addEmail, email } = useContext(EmailContext)
  const [goToHomePage, setGoToHomePage] = useState(false);


  const handleChange = (event) => {
    const value = event.target.value;
    setPostProfil({
      ...postProfil,
      [event.target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email: postProfil.email,
      password: postProfil.password,
      passwordConfirm: postProfil.passwordConfirm,
    };

    try {
      const response = await axios.post('http://localhost:4000/signup', userData);
      console.log(response.status, 
        // response.data.token
        );
      login();
      setEmail(postProfil.email)
      setTimeout(() => {
      setGoToHomePage(true);
      }, 1500);
    } catch (error) {
      console.log('Error:', error);
    }

    console.log(isLoggedIn)

  };

  if (goToHomePage) {
    return <Navigate to="/" />;
  }

  return (
    <div className='CreateProfile-container'>
      <form className='CreateProfile-container-form' onSubmit={handleSubmit}>
        <label htmlFor='email'>Votre email</label>
        <input
          onChange={handleChange}
          className='CreateProfile-container-form-input'
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

        <label htmlFor='passwordConfirm'>Confirmez votre mot de passe</label>
        <input
          onChange={handleChange}
          className='CreateProfile-container-form-input'
          type='password'
          id='passwordConfirm'
          name='passwordConfirm'
          required
          placeholder='v0tr3MdP1c1'
        />

        <Link key='signin' to='/signin'>
          <aside className='new-account'>Vous avez déjà un compte ?</aside>
        </Link>

        <button type='submit'>Créer compte</button>
      </form>
      
      {email && <Connected email={email}/>}
    </div>
  );
};

export default CreateProfile;
