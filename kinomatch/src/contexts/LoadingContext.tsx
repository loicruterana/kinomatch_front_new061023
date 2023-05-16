import React, { createContext, useState } from 'react';

// Création du contexte
export const LoadingContext = createContext();

// Fournisseur de contexte
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const load = () => {
    setIsLoading(true);
  };

  const unload = () => {
    setIsLoading(false);
  };


  return (
    <LoadingContext.Provider value={{ isLoading, load, unload }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
