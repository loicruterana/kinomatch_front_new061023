// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode, Key } from 'react';

// ================ INTERFACES ================

// Interface définissant les propriétés du contexte. Elle contient un id qui est soit un string, soit null, soit undefined, un provider_name qui est un string et un provider_id qui est un string.
interface ProviderFilter {
  id: Key | null | undefined;
  provider_name: string;
  provider_id: string;
}

// Interface définissant les propriétés du contexte. Elle contient un tableau de ProviderFilter, une fonction pour ajouter un filtre par provider et une fonction pour supprimer les filtres par provider.
interface SelectedProviderFiltersContextType {
  selectedProviderFilters: ProviderFilter[];
  addProviderFilter: (name: string, providerId: string) => void;
  removeProviderFilter: (name: string) => void;
}

// Interface définissant les propriétés du contexte. Elle contient les enfants du composant.
interface SelectedProviderFiltersProviderProps {
  children: ReactNode;
}

// ================ CREATECONTEXT ================

// Définition du contexte et de ses types.
export const SelectedProviderFiltersContext =
  createContext<SelectedProviderFiltersContextType>(
    {} as SelectedProviderFiltersContextType
  );

// ================ CONTEXT ================

// Export de la fonction SelectedProviderFiltersProvider qui prend en argument les enfants du composant.
export const SelectedProviderFiltersProvider: React.FC<
  SelectedProviderFiltersProviderProps
> = ({ children }) => {
  // ================ USESTATE ================

  // UseState pour les filtres par provider.
  const [selectedProviderFilters, setSelectedProviderFilters] = useState<
    ProviderFilter[]
  >([]);

  // ================ FONCTIONS ================

  // Fonction pour ajouter un filtre par provider. Si le filtre est déjà présent, on le supprime.
  const addProviderFilter = (name: string, providerId: string) => {
    // vérifie si le filtre provider est déjà présent dans le state
    if (selectedProviderFilters.some((f) => f.provider_name === name)) {
      removeProviderFilter(name);
      return;
    }
    //!  ================"id" DÉCLARÉ MAIS NON UTILISÉ EN BDD =============
    // On ajoute le filtre au tableau (state).
    setSelectedProviderFilters((state) => [
      ...state,
      {
        id: 0,
        provider_name: name,
        provider_id: providerId,
      },
    ]);
  };

  // Fonction pour supprimer les filtres par provider. Si le filtre est déjà présent, on le supprime.
  const removeProviderFilter = (name: string) => {
    setSelectedProviderFilters((state) =>
      state.filter((f) => f.provider_name !== name)
    );
  };

  // ================ CONTEXT : EXPORT DES PROPS ================

  // Export des props du contexte.
  return (
    <SelectedProviderFiltersContext.Provider
      value={{
        selectedProviderFilters,
        addProviderFilter,
        removeProviderFilter,
      }}
    >
      {children}
    </SelectedProviderFiltersContext.Provider>
  );
};
