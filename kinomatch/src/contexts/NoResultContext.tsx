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
export const NoResultContext = createContext<NoResultContext>(
  {} as NoResultContext
);

//* ================ CONTEXT ================

export const NoResultProvider: React.FC<NoResultProviderProps> = ({
  children,
}) => {
  // ================ USESTATE ================

  // state qui permet de savoir si la recherche n'a pas de résultat
  const [noResult, setNoResult] = useState(false);

  // ================ FONCTIONS ================

  // fonction qui permet de changer la valeur de noResult
  const handleNoResult = () => {
    // change la valeur de noResult
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
