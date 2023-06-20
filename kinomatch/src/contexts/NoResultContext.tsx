// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode } from 'react';

// ================ INTERFACES ================

// Interface définissant les propriétés du contexte. Elle contient une fonction pour gérer le noResult et un boolean pour savoir si le noResult est actif.
interface NoResultContext {
  handleNoResult: () => void;
  noResult: boolean;
}

// Interface définissant les propriétés du composant. Elle contient les enfants du composant.
interface NoResultProviderProps {
  children: ReactNode;
}

// ================ CREATECONTEXT ================

// Définition du contexte et de ses types.
export const NoResultContext = createContext<NoResultContext>({} as NoResultContext);

// ================ CONTEXT ================

// export de la fonction NoResultProvider qui prend en argument les enfants du composant.
export const NoResultProvider: React.FC<NoResultProviderProps> = ({ children }) => {

  // ================ USESTATE ================

  // UseState pour savoir si le noResult est actif.
  const [noResult, setNoResult] = useState(false);

  // ================ FONCTIONS ================

  // Fonction pour gérer le noResult.
  const handleNoResult = () => {
    setNoResult(!noResult);
  };


  // ================ CONTEXT : EXPORT DES PROPS ================ 

  // export des propriétés du contexte.
  const contextValue: NoResultContext = {
    handleNoResult,
    noResult,
  };

  // On retourne le contexte avec les propriétés.
  return (
    <NoResultContext.Provider value={contextValue}>
      {children}
    </NoResultContext.Provider>
  );
};
