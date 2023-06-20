// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode } from 'react';

// ================ INTERFACES ================

// Interface définissant les propriétés du contexte. Elle contient l'identifiant du film actuel et deux fonctions : une pour modifier l'identifiant du film actuel et une pour ajouter les données du film actuel.
export interface CurrentMovieIdContextProps {
  currentMovieId: string;
  setCurrentMovieId: (movieId: string) => void;
  addMovieData: (movieId: string) => void;
}
// Interface définissant les propriétés du composant. Elle contient les enfants du composant.
interface CurrentMovieIdProviderProps {
  children: ReactNode;
}

// ================ CREATECONTEXT ================

// Définition du contexte et de ses types.
export const CurrentMovieIdContext = createContext<CurrentMovieIdContextProps>({
  currentMovieId: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentMovieId: () => { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addMovieData: () => { },
});

// ================ CONTEXT ================

// export de la fonction CurrentMovieIdProvider qui prend en argument les enfants du composant.
export const CurrentMovieIdProvider: React.FC<CurrentMovieIdProviderProps> = ({ children }) => {

  // ================ USESTATE ================

  // UseState pour l'identifiant du film actuel.
  const [currentMovieId, setCurrentMovieId] = useState('');

  // ================ FONCTIONS ================

  // Fonction pour ajouter l'id du film actuel.
  const addMovieData = (movieId: string): void => {
    setCurrentMovieId(movieId || '');
  };

  // ================ CONTEXT : EXPORT DES PROPS ================ 

  // Définition des propriétés du contexte.
  const contextValue: CurrentMovieIdContextProps = {
    currentMovieId,
    setCurrentMovieId,
    addMovieData,
  };

  // On retourne le contexte avec ses propriétés.
  return (
    <CurrentMovieIdContext.Provider value={contextValue}>
      {children}
    </CurrentMovieIdContext.Provider>
  );
};

export default CurrentMovieIdProvider;
