import React, { createContext, useState, ReactNode } from 'react';

// Création du contexte
export interface CurrentMovieIdContextProps {
  currentMovieId: string;
  setCurrentMovieId: (movieId: string) => void;
  addMovieData: (movieId: string) => void;
}

export const CurrentMovieIdContext = createContext<CurrentMovieIdContextProps>();

// Fournisseur de contexte
interface CurrentMovieIdProviderProps {
  children: ReactNode;
}

export const CurrentMovieIdProvider: React.FC<CurrentMovieIdProviderProps> = ({ children }) => {
  const [currentMovieId, setCurrentMovieId] = useState('');

  const addMovieData = (movieId: string): void => {
    console.log(movieId);
    setCurrentMovieId(movieId || '');
  };

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
