// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode, Key } from 'react';

// ================ INTERFACES ================
interface ProviderFilter {
  id: Key | null | undefined;
  provider_name: string;
  provider_id: string;
}
interface SelectedProviderFiltersContextType {
  selectedProviderFilters: ProviderFilter[];
  addProviderFilter: (name: string, providerId: string) => void;
  removeProviderFilter: (name: string) => void;
}
interface SelectedProviderFiltersProviderProps {
  children: ReactNode;
}

// ================ CREATECONTEXT ================

export const SelectedProviderFiltersContext = createContext<SelectedProviderFiltersContextType>(
  {} as SelectedProviderFiltersContextType
);

//* ================ CONTEXT ================

export const SelectedProviderFiltersProvider: React.FC<SelectedProviderFiltersProviderProps> = ({ children }) => {
  
// ================ USESTATE ================

  const [selectedProviderFilters, setSelectedProviderFilters] = useState<ProviderFilter[]>([]);

  // ================ FONCTIONS ================

  const addProviderFilter = (name: string, providerId: string) => {
    if (selectedProviderFilters.some((f) => f.provider_name === name)) {
      removeProviderFilter(name);
      return;
    }
    //!  ================"id" DÉCLARÉ MAIS NON UTILISÉ EN BDD =============
    setSelectedProviderFilters((state) => [
      ...state,
      {
        id:0, 
        provider_name: name,
        provider_id: providerId,
      }
    ]);
  };

  const removeProviderFilter = (name: string) => {
    setSelectedProviderFilters((state) => state.filter((f) => f.provider_name !== name));
  };

//* ================ CONTEXT : EXPORT DES PROPS ================ 

  return (
    <SelectedProviderFiltersContext.Provider value={{ selectedProviderFilters, addProviderFilter, removeProviderFilter }}>
      {children}
    </SelectedProviderFiltersContext.Provider>
  );
};

export default SelectedProviderFiltersProvider;
