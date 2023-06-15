// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode } from 'react';

// ================ INTERFACES ================
interface SelectedDecadeFiltersContextProps {
  selectedDecadeFilters: string[];
  addDecadeFilter: (filter: string) => void;
  removeDecadeFilter: () => void;
}

// ================ CREATECONTEXT ================

export const SelectedDecadeFiltersContext = createContext<SelectedDecadeFiltersContextProps>(
  {} as SelectedDecadeFiltersContextProps
);

//* ================ CONTEXT ================

export const SelectedDecadeFiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
// ================ USESTATE ================

  const [selectedDecadeFilters, setSelectedDecadeFilters] = useState<string[]>([]);
 
// ================ FONCTIONS ================

  const addDecadeFilter = (filter: string) => {
    if (selectedDecadeFilters.includes(filter)) {
      removeDecadeFilter();
      return;
    }
    setSelectedDecadeFilters([filter]);
  };

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
