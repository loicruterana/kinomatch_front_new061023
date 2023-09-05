// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode } from 'react';

// ================ INTERFACES ================

// Interface définissant les propriétés du contexte. Elle contient un tableau de string pour les filtres par décennie, une fonction pour ajouter un filtre par décennie et une fonction pour supprimer les filtres par décennie.
interface SelectedNotationFiltersContextProps {
  selectedNotationFilters: string[];
  addNotationFilter: (filter: string) => void;
  removeNotationFilter: () => void;
}

// ================ CREATECONTEXT ================

// Définition du contexte et de ses types.
export const SelectedNotationFiltersContext =
  createContext<SelectedNotationFiltersContextProps>(
    {} as SelectedNotationFiltersContextProps
  );

// ================ CONTEXT ================

// export de la fonction SelectedNotationFiltersProvider qui prend en argument les enfants du composant.
export const SelectedNotationFiltersProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  // ================ USESTATE ================

  // state pour stocker le filtre sélectionné
  const [selectedNotationFilters, setSelectedNotationFilters] = useState<string[]>(
    []
  );

  // ================ FONCTIONS ================

  // Fonction pour ajouter un filtre par note. Si le filtre est déjà présent, on le supprime.
  const addNotationFilter = (filter: string) => {
    if (selectedNotationFilters.includes(filter)) {
      removeNotationFilter();
      return;
    }
    // ajoute le filtre au state
    setSelectedNotationFilters([filter]);
  };

  // Fonction pour supprimer les filtres par note.
  const removeNotationFilter = () => {
    setSelectedNotationFilters([]);
  };

  //* ================ CONTEXT : EXPORT DES PROPS ================


  // export des propriétés du contexte.
  const contextValue: SelectedNotationFiltersContextProps = {
    selectedNotationFilters,
    addNotationFilter,
    removeNotationFilter,
  };

  // On retourne le contexte avec les propriétés.
  return (
    <SelectedNotationFiltersContext.Provider value={contextValue}>
      {children}
    </SelectedNotationFiltersContext.Provider>
  );
};
