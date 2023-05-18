import React, { createContext, useState } from 'react';

// Création du contexte
export const SelectedProviderFiltersContext = createContext();

// Fournisseur de contexte
export const SelectedProviderFiltersProvider = ({ children }) => {
  const [selectedProviderFilters, setSelectedProviderFilters] = useState([]);

  const addProviderFilter = (filter) => {
    if (selectedProviderFilters.includes(filter)) {
      removeProviderFilter(filter)
      return;
    }
    setSelectedProviderFilters((state) => [...state, filter]);
  };

  const removeProviderFilter = (filter) => {
    setSelectedProviderFilters((state) => state.filter((f) => f !== filter));
  };

  return (
    <SelectedProviderFiltersContext.Provider value={{ selectedProviderFilters, addProviderFilter, removeProviderFilter }}>
      {children}
    </SelectedProviderFiltersContext.Provider>
  );
};

export default SelectedProviderFiltersProvider;
