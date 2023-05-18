import React, { createContext, useState } from 'react';

// Création du contexte
export const SelectedGenreFiltersContext = createContext();

// Fournisseur de contexte
export const SelectedGenreFiltersProvider = ({ children }) => {
  const [selectedGenreFilters, setSelectedGenreFilters] = useState([]);

  const addGenreFilter = (filter) => {
    if (selectedGenreFilters.includes(filter)) {
      removeGenreFilter(filter)
      return;
    }
    setSelectedGenreFilters((state) => [...state, filter]);
  };

  const removeGenreFilter = (filter) => {
    setSelectedGenreFilters((state) => state.filter((f) => f !== filter));
  };

  return (
    <SelectedGenreFiltersContext.Provider value={{ selectedGenreFilters, addGenreFilter, removeGenreFilter }}>
      {children}
    </SelectedGenreFiltersContext.Provider>
  );
};

export default SelectedGenreFiltersProvider;
