// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode } from 'react';

// ================ INTERFACES ================

export interface CurrentMovieIdContextProps {
  currentMovieId: string;
  setCurrentMovieId: (movieId: string) => void;
  addMovieData: (movieId: string) => void;
}
interface CurrentMovieIdProviderProps {
  children: ReactNode;
}

// ================ CREATECONTEXT ================

export const CurrentMovieIdContext = createContext<CurrentMovieIdContextProps>({
  currentMovieId: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentMovieId: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addMovieData: () => {},
});

//* ================ CONTEXT ================

export const CurrentMovieIdProvider: React.FC<CurrentMovieIdProviderProps> = ({ children }) => {

// ================ USESTATE ================

  const [currentMovieId, setCurrentMovieId] = useState('');

// ================ FONCTIONS ================

  const addMovieData = (movieId: string): void => {
    setCurrentMovieId(movieId || '');
  };

//* ================ CONTEXT : EXPORT DES PROPS ================ 
  
const contextValue: CurrentMovieIdContextProps = {
  currentMovieId,
  setCurrentMovieId,
  addMovieData,
};

  return (
    <CurrentMovieIdContext.Provider value={contextValue}>
      {children}
    </CurrentMovieIdContext.Provider>
  );
};

export default CurrentMovieIdProvider;
