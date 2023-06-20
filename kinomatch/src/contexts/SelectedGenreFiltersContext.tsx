// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode } from 'react';

// ================ INTERFACES ================

// Interface définissant les propriétés du contexte. Elle contient un name et un id qui sont des string.
interface Genre {
  name: string;
  id: string;
}

// Interface définissant les propriétés du contexte. Elle contient un tableau de Genre, une fonction pour ajouter un filtre par genre et une fonction pour supprimer les filtres par genre.
interface SelectedGenreFiltersContextType {
  selectedGenreFilters: Genre[];
  addGenreFilter: (name: string, genreId: string) => void;
  removeGenreFilter: (name: string) => void;
}

// ================ CREATECONTEXT ================

// Définition du contexte et de ses types.
export const SelectedGenreFiltersContext = createContext<SelectedGenreFiltersContextType>(
  {} as SelectedGenreFiltersContextType
);

// ================ CONTEXT ================

// Export de la fonction SelectedGenreFiltersProvider qui prend en argument les enfants du composant.
export const SelectedGenreFiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

// ================ USESTATE ================

// UseState pour les filtres par genre.
  const [selectedGenreFilters, setSelectedGenreFilters] = useState<Genre[]>([]);

// ================ FONCTIONS ================

// Fonction pour ajouter un filtre par genre. Si le filtre est déjà présent, on le supprime.
  const addGenreFilter = (name: string, genreId: string) => {
    if (selectedGenreFilters.some((f) => f.name === name)) {
      removeGenreFilter(name);
      return;
    }
    // On ajoute le filtre au tableau.
    setSelectedGenreFilters((state) => [
      ...state,
      {
        name: name,
        id: genreId,
      }
    ]);
  };

  // Fonction pour supprimer les filtres par genre. Si le filtre est déjà présent, on le supprime.
  const removeGenreFilter = (name: string) => {
    setSelectedGenreFilters((state) => state.filter((f) => f.name !== name));
  };

// ================ CONTEXT : EXPORT DES PROPS ================ 

// export des propriétés du contexte.
  return (
    <SelectedGenreFiltersContext.Provider value={{ selectedGenreFilters, addGenreFilter, removeGenreFilter }}>
      {children}
    </SelectedGenreFiltersContext.Provider>
  );
};
