// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode } from 'react';

// ================ INTERFACES ================

// Interface définissant les propriétés du contexte. Elle contient un name et un id qui sont des string.
interface Nationality {
  native_name: string;
  iso_3166_1: string;
}

// Interface définissant les propriétés du contexte. Elle contient un tableau de Nationality, une fonction pour ajouter un filtre par Nationality et une fonction pour supprimer les filtres par Nationality.
interface SelectedNationalityFiltersContextType {
  selectedNationalityFilters: Nationality[];
  addNationalityFilter: (name: string, nationalityId: string) => void;
  removeNationalityFilter: (name: string) => void;
}

// Interface définissant les propriétés du contexte. Elle contient les enfants du composant.
interface SelectedNationalityFiltersProps {
  children: ReactNode;
}

// ================ CREATECONTEXT ================

// Définition du contexte et de ses types.
export const SelectedNationalityFiltersContext =
  createContext<SelectedNationalityFiltersContextType>(
    {} as SelectedNationalityFiltersContextType
  );

// ================ CONTEXT ================

// Export de la fonction SelectedNationalityFiltersProvider qui prend en argument les enfants du composant.
export const SelectedNationalityFiltersProvider: React.FC<
  SelectedNationalityFiltersProps
> = ({ children }) => {
  // ================ USESTATE ================

  // UseState pour les filtres par Nationality.
  const [selectedNationalityFilters, setSelectedNationalityFilters] = useState<Nationality[]>([]);

  // ================ FONCTIONS ================

  // Fonction pour ajouter un filtre par Nationality. Si le filtre est déjà présent, on le supprime.
  const addNationalityFilter = (name: string, nationalityId: string) => {
    // vérifie si le Nationality est déjà présente dans le state
    if (selectedNationalityFilters.some((f) => f.native_name === name)) {
      removeNationalityFilter(name);
      return;
    }
    // On ajoute le filtre Nationality au tableau (state).
    setSelectedNationalityFilters((state) => [
      ...state,
      {
        native_name: name,
        iso_3166_1: nationalityId,
      },
    ]);
  };

  // Fonction pour supprimer les filtres par Nationality. Si le filtre est déjà présent, on le supprime.
  const removeNationalityFilter = (name: string) => {
    // supprime le Nationality du state
    setSelectedNationalityFilters((state) => state.filter((f) => f.native_name !== name));
  };

  // ================ CONTEXT : EXPORT DES PROPS ================

  // export des propriétés du contexte.
  return (
    <SelectedNationalityFiltersContext.Provider
      value={{
        selectedNationalityFilters,
        addNationalityFilter,
        removeNationalityFilter,
      }}
    >
      {children}
    </SelectedNationalityFiltersContext.Provider>
  );
};
