import React, { createContext, useState, ReactNode, Key } from 'react';

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

export const SelectedProviderFiltersContext = createContext<SelectedProviderFiltersContextType>(
  {} as SelectedProviderFiltersContextType
);

export const SelectedProviderFiltersProvider: React.FC<SelectedProviderFiltersProviderProps> = ({ children }) => {
  const [selectedProviderFilters, setSelectedProviderFilters] = useState<ProviderFilter[]>([]);

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

  return (
    <SelectedProviderFiltersContext.Provider value={{ selectedProviderFilters, addProviderFilter, removeProviderFilter }}>
      {children}
    </SelectedProviderFiltersContext.Provider>
  );
};

export default SelectedProviderFiltersProvider;
