import React, { createContext, useState } from 'react';

// Création du contexte
export const EmailContext = createContext();

// Fournisseur de contexte
export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  const addEmail = (inputEmail) => {
    setEmail(inputEmail);
  };

  const removeEmail = (inputEmail) => {
    setEmail('');
  };

  return (
    <EmailContext.Provider value={{ addEmail, email, removeEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

export default EmailProvider;
