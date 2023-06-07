import React, { createContext, useState } from 'react';

// Création du contexte
export const NoResultContext = createContext();

// Fournisseur de contexte
export const NoResultProvider = ({ children }) => {
  const [noResult, setNoResult] = useState(false);

  const handleNoResult = () => {
    setNoResult(!noResult);
  };

  return (
    <NoResultContext.Provider value={{ handleNoResult, noResult }}>
      {children}
    </NoResultContext.Provider>
  );
};

export default NoResultProvider;
