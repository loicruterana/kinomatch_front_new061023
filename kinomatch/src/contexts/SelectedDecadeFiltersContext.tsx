// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode } from 'react';

// ================ INTERFACES ================

// Interface définissant les propriétés du contexte. Elle contient un tableau de string pour les filtres par décennie, une fonction pour ajouter un filtre par décennie et une fonction pour supprimer les filtres par décennie.
interface SelectedDecadeFiltersContextProps {
  selectedDecadeFilters: string[];
  addDecadeFilter: (filter: string) => void;
  removeDecadeFilter: () => void;
}

// ================ CREATECONTEXT ================

// Définition du contexte et de ses types.
export const SelectedDecadeFiltersContext = createContext<SelectedDecadeFiltersContextProps>(
  {} as SelectedDecadeFiltersContextProps
);

// ================ CONTEXT ================

// export de la fonction SelectedDecadeFiltersProvider qui prend en argument les enfants du composant.
export const SelectedDecadeFiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
// ================ USESTATE ================

// UseState pour les filtres par décennie.
  const [selectedDecadeFilters, setSelectedDecadeFilters] = useState<string[]>([]);
 
// ================ FONCTIONS ================

// Fonction pour ajouter un filtre par décennie. Si le filtre est déjà présent, on le supprime.
  const addDecadeFilter = (filter: string) => {
    if (selectedDecadeFilters.includes(filter)) {
      removeDecadeFilter();
      return;
    }
    setSelectedDecadeFilters([filter]);
  };

  // Fonction pour supprimer les filtres par décennie.
  const removeDecadeFilter = () => {
    setSelectedDecadeFilters([]);
  };



// ================ CONTEXT : EXPORT DES PROPS ================ 

// export des propriétés du contexte.
const contextValue: SelectedDecadeFiltersContextProps = {
  selectedDecadeFilters,
  addDecadeFilter,
  removeDecadeFilter,
};

// On retourne le contexte avec les propriétés.
  return (
    <SelectedDecadeFiltersContext.Provider value={contextValue}>
      {children}
    </SelectedDecadeFiltersContext.Provider>
  );
};
