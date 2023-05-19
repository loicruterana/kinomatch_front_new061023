import React, { createContext, useState } from 'react';

// Création du contexte
export const EmailContext = createContext();

// Fournisseur de contexte
export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  const addEmail = (inputemail) => {
    setEmail(inputemail);
  };

  const removeEmail = (inputemail) => {
    setEmail('');
  };

  return (
    <EmailContext.Provider value={{ addEmail, email }}>
      {children}
    </EmailContext.Provider>
  );
};

export default EmailProvider;
