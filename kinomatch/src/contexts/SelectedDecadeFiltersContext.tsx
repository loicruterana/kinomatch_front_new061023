import React, { createContext, useState } from 'react';

// Création du contexte
export const SelectedDecadeFiltersContext = createContext();

// Fournisseur de contexte
export const SelectedDecadeFiltersProvider = ({ children }) => {
  const [selectedDecadeFilters, setSelectedDecadeFilters] = useState([]);

  const addDecadeFilter = (filter) => {
    if (selectedDecadeFilters.includes(filter)) {
      removeDecadeFilter(filter)
      return;
    }
    setSelectedDecadeFilters([filter]);
  };

  const removeDecadeFilter = () => {
    setSelectedDecadeFilters([]);
  };

  return (
    <SelectedDecadeFiltersContext.Provider value={{ selectedDecadeFilters, addDecadeFilter, removeDecadeFilter }}>
      {children}
    </SelectedDecadeFiltersContext.Provider>
  );
};

export default SelectedDecadeFiltersProvider;
