// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode } from 'react';

// ================ INTERFACES ================
interface SelectedDecadeFiltersContextProps {
  selectedDecadeFilters: string[];
  addDecadeFilter: (filter: string) => void;
  removeDecadeFilter: () => void;
}

// ================ CREATECONTEXT ================

export const SelectedDecadeFiltersContext =
  createContext<SelectedDecadeFiltersContextProps>(
    {} as SelectedDecadeFiltersContextProps
  );

//* ================ CONTEXT ================

export const SelectedDecadeFiltersProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  // ================ USESTATE ================

  // state pour stocker le filtre sélectionné
  const [selectedDecadeFilters, setSelectedDecadeFilters] = useState<string[]>(
    []
  );

  // ================ FONCTIONS ================

  // fonction pour ajouter un filtre
  // vérifie si le filtre est déjà présent dans le state
  const addDecadeFilter = (filter: string) => {
    if (selectedDecadeFilters.includes(filter)) {
      removeDecadeFilter();
      return;
    }
    // ajoute le filtre au state
    setSelectedDecadeFilters([filter]);
  };

  // fonction pour supprimer un filtre
  const removeDecadeFilter = () => {
    setSelectedDecadeFilters([]);
  };

  //* ================ CONTEXT : EXPORT DES PROPS ================

  const contextValue: SelectedDecadeFiltersContextProps = {
    selectedDecadeFilters,
    addDecadeFilter,
    removeDecadeFilter,
  };

  return (
    <SelectedDecadeFiltersContext.Provider value={contextValue}>
      {children}
    </SelectedDecadeFiltersContext.Provider>
  );
};
