import React, { createContext, useState } from 'react';

// Création du contexte
export const CurrentMovieIdContext = createContext();

// Fournisseur de contexte
export const CurrentMovieIdProvider = ({ children }) => {
  const [currentMovieId, setCurrentMovieId] = useState('');

  const addMovieData = (movieId) => {
    console.log(movieId);
    setCurrentMovieId(movieId || '');
  }

  return (
    <CurrentMovieIdContext.Provider value={{ currentMovieId, setCurrentMovieId, addMovieData }}>
      {children}
    </CurrentMovieIdContext.Provider>
  );
};

export default CurrentMovieIdProvider;
