// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode } from 'react';

// ================ INTERFACES ================
interface NoResultContext {
  handleNoResult: () => void;
  noResult: boolean;
}
interface NoResultProviderProps {
  children: ReactNode;
}

// ================ CREATECONTEXT ================
export const NoResultContext = createContext<NoResultContext>({} as NoResultContext);

//* ================ CONTEXT ================

export const NoResultProvider: React.FC<NoResultProviderProps> = ({ children }) => {

// ================ USESTATE ================

  const [noResult, setNoResult] = useState(false);

// ================ FONCTIONS ================

  const handleNoResult = () => {
    setNoResult(!noResult);
  };


//* ================ CONTEXT : EXPORT DES PROPS ================ 

const contextValue: NoResultContext = {
  handleNoResult,
  noResult,
};

  return (
    <NoResultContext.Provider value={contextValue}>
      {children}
    </NoResultContext.Provider>
  );
};

export default NoResultProvider;
