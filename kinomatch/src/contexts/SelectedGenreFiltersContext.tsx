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

export const SelectedGenreFiltersContext =
  createContext<SelectedGenreFiltersContextType>(
    {} as SelectedGenreFiltersContextType
  );

//* ================ CONTEXT ================

export const SelectedGenreFiltersProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  // ================ USESTATE ================
  // state qui contient les genres sélectionnés
  const [selectedGenreFilters, setSelectedGenreFilters] = useState<Genre[]>([]);

  // ================ FONCTIONS ================
  //  fonction qui ajoute un genre à la liste des genres sélectionnés
  const addGenreFilter = (name: string, genreId: string) => {
    // vérifie si le genre est déjà présent dans le state
    if (selectedGenreFilters.some((f) => f.name === name)) {
      removeGenreFilter(name);
      return;
    }
    // ajoute le genre au state
    setSelectedGenreFilters((state) => [
      ...state,
      {
        name: name,
        id: genreId,
      },
    ]);
  };

  // fonction qui supprime un genre de la liste des genres sélectionnés
  const removeGenreFilter = (name: string) => {
    // supprime le genre du state
    setSelectedGenreFilters((state) => state.filter((f) => f.name !== name));
  };

  //* ================ CONTEXT : EXPORT DES PROPS ================

  return (
    <SelectedGenreFiltersContext.Provider
      value={{ selectedGenreFilters, addGenreFilter, removeGenreFilter }}
    >
      {children}
    </SelectedGenreFiltersContext.Provider>
  );
};

export default SelectedGenreFiltersProvider;
