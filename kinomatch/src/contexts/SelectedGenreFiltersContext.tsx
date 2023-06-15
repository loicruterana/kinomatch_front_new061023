// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode } from 'react';

// ================ INTERFACES ================

interface Genre {
  name: string;
  id: string;
}

interface SelectedGenreFiltersContextType {
  selectedGenreFilters: Genre[];
  addGenreFilter: (name: string, genreId: string) => void;
  removeGenreFilter: (name: string) => void;
}

// ================ CREATECONTEXT ================

export const SelectedGenreFiltersContext = createContext<SelectedGenreFiltersContextType>(
  {} as SelectedGenreFiltersContextType
);

//* ================ CONTEXT ================

export const SelectedGenreFiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

// ================ USESTATE ================

  const [selectedGenreFilters, setSelectedGenreFilters] = useState<Genre[]>([]);

// ================ FONCTIONS ================

  const addGenreFilter = (name: string, genreId: string) => {
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

  const removeGenreFilter = (name: string) => {
    setSelectedGenreFilters((state) => state.filter((f) => f.name !== name));
  };

//* ================ CONTEXT : EXPORT DES PROPS ================ 

  return (
    <SelectedGenreFiltersContext.Provider value={{ selectedGenreFilters, addGenreFilter, removeGenreFilter }}>
      {children}
    </SelectedGenreFiltersContext.Provider>
  );
};

export default SelectedGenreFiltersProvider;
