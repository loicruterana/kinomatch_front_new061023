import React, { createContext, useState } from 'react';

// Création du contexte
export const LoadingContext = createContext();

// Fournisseur de contexte
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const load = () => {
    setIsLoading(true);
  };

  const unload = () => {
    setIsLoading(false);
  };

  const addError = (error) => {
    setError(error);
  };


  return (
    <LoadingContext.Provider value={{ isLoading, load, unload, error, addError }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
