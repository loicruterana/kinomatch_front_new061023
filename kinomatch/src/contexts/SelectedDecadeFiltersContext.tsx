// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode } from 'react';

// ================ INTERFACES ================

// Interface définissant les propriétés du contexte. Elle contient un tableau de string pour les filtres par décennie, une fonction pour ajouter un filtre par décennie et une fonction pour supprimer les filtres par décennie.
interface SelectedDecadeFiltersContextProps {
  selectedDecadeFilters: string[];
  addDecadeFilter: (filter: string) => void;
  removeDecadeFilter: (filter: string) => void;
}

// ================ CREATECONTEXT ================

// Définition du contexte et de ses types.
export const SelectedDecadeFiltersContext =
  createContext<SelectedDecadeFiltersContextProps>(
    {} as SelectedDecadeFiltersContextProps
  );

// ================ CONTEXT ================

// export de la fonction SelectedDecadeFiltersProvider qui prend en argument les enfants du composant.
export const SelectedDecadeFiltersProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  // ================ USESTATE ================

  // state pour stocker le filtre sélectionné
  const [selectedDecadeFilters, setSelectedDecadeFilters] = useState<string[]>(
    []
  );

  // ================ FONCTIONS ================

  // Fonction pour ajouter un filtre par décennie. Si le filtre est déjà présent, on le supprime.
  // const addDecadeFilter = (filter: string) => {
  //   if (selectedDecadeFilters.includes(filter)) {
  //     removeDecadeFilter();
  //     return;
  //   }
  //   // ajoute le filtre au state
  //   setSelectedDecadeFilters([filter]);
  // };

  // Fonction pour ajouter plusieurs filtres par décennie. Si le filtre est déjà présent, on le supprime.
  const addDecadeFilter = (filter: string) => {
    // vérifie si le filtre est déjà présent dans le state
    if (selectedDecadeFilters.some((f) => f === filter)) {
      removeDecadeFilter(filter);
      return;
    } 
    // Si selectedDecadeFilters contient déja deux filtres, on supprime le filtre le plus proche de la decade sélectionnée.
    if (selectedDecadeFilters.length === 2) {
      // On récupère la décennie la plus proche de la décennie sélectionnée.
      const closestDecade = selectedDecadeFilters.reduce((prev, curr) =>
        Math.abs(parseInt(curr) - parseInt(filter)) <
        Math.abs(parseInt(prev) - parseInt(filter))
          ? curr
          : prev
      );
      // On supprime la décennie la plus proche de la décennie sélectionnée.
      removeDecadeFilter(closestDecade);
    }
    
    // On ajoute le filtre au tableau (state).
    setSelectedDecadeFilters((state) => [...state, filter]);
  };


  // Fonction pour supprimer les filtres par décennie.
  const removeDecadeFilter = (filter: string) => {
    // on supprime la décennie du state
    setSelectedDecadeFilters((state) => state.filter((f) => f !== filter)
    );
  };


  //* ================ CONTEXT : EXPORT DES PROPS ================

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
