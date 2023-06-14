import React, { createContext, useState, ReactNode } from 'react';

// Création du contexte
export interface CurrentMovieIdContextProps {
  currentMovieId: string;
  setCurrentMovieId: (movieId: string) => void;
  addMovieData: (movieId: string) => void;
}

export const CurrentMovieIdContext = createContext<CurrentMovieIdContextProps>({
  currentMovieId: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentMovieId: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addMovieData: () => {},
});

// Fournisseur de contexte
interface CurrentMovieIdProviderProps {
  children: ReactNode;
}

export const CurrentMovieIdProvider: React.FC<CurrentMovieIdProviderProps> = ({ children }) => {
  const [currentMovieId, setCurrentMovieId] = useState('');

  const addMovieData = (movieId: string): void => {
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
