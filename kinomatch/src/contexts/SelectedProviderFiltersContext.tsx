import React, { createContext, useState } from 'react';

// Création du contexte
export const SelectedProviderFiltersContext = createContext();

// Fournisseur de contexte
export const SelectedProviderFiltersProvider = ({ children }) => {
  const [selectedProviderFilters, setSelectedProviderFilters] = useState([]);

  const addProviderFilter = (name, providerId) => {
    if (selectedProviderFilters.some((f) => f.provider_name === name)) {
      removeProviderFilter(name);
      return;
    }
    setSelectedProviderFilters((state) => [
      ...state,
      {
        provider_name: name,
        provider_id: providerId,
      }
    ]);
  };  

  const removeProviderFilter = (name) => {
    setSelectedProviderFilters((state) => state.filter((f) => f.provider_name !== name));
  };

  return (
    <SelectedProviderFiltersContext.Provider value={{ selectedProviderFilters, addProviderFilter, removeProviderFilter }}>
      {children}
    </SelectedProviderFiltersContext.Provider>
  );
};

export default SelectedProviderFiltersProvider;