import React, { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';



import './CreateProfile.scss';

export const CreateProfile = () => {
  
  const handleVerificationSuccess = (token, ekey) => {
    // Faire quelque chose avec le token
    console.log(token);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="CreateProfile-container">
      <form className="CreateProfile-container-form"
      onSubmit={handleSubmit}
      action="/submit-form.php" //à modifier
      method="POST">
        <label htmlFor="username">Votre email</label>
        <input className='CreateProfile-container-form-input' type="text" id="username" name="username" required placeholder='votre@email.com' />
        <label htmlFor="password">Votre mot de passe</label>
        <input className='CreateProfile-container-form-input' type="password" id="password" name="password" required placeholder='v0tr3MdP1c1'/>
        {/* <HCaptcha
        sitekey="7089290a-26a0-4d4d-8124-cfbe1a2c3b8a"
        onVerify={(token,ekey) => handleVerificationSuccess(token, ekey)}
        />         */}
      <button type='submit'>CRÉER COMPTE</button>
      </form>


    </div> 
  )
}

export default CreateProfile;