import React, { createContext, useState } from 'react';

// Création du contexte
export const SelectedGenreFiltersContext = createContext();

// Fournisseur de contexte
export const SelectedGenreFiltersProvider = ({ children }) => {
  const [selectedGenreFilters, setSelectedGenreFilters] = useState([]);

  const addGenreFilter = (name, genreId) => {
    if (selectedGenreFilters.some((f) => f.name === name)) {
      removeGenreFilter(name);
      return;
    }
    setSelectedGenreFilters((state) => [
      ...state,
      {
        name: name,
        id: genreId,
      }
    ]);
  };  
  

  const removeGenreFilter = (name) => {
    setSelectedGenreFilters((state) => state.filter((f) => f.name !== name));
  };

  return (
    <SelectedGenreFiltersContext.Provider value={{ selectedGenreFilters, addGenreFilter, removeGenreFilter }}>
      {children}
    </SelectedGenreFiltersContext.Provider>
  );
};

export default SelectedGenreFiltersProvider;