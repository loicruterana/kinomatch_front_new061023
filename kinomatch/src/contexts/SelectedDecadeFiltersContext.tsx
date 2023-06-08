import React, { createContext, useState, ReactNode } from 'react';

interface SelectedDecadeFiltersContextProps {
  selectedDecadeFilters: string[];
  addDecadeFilter: (filter: string) => void;
  removeDecadeFilter: () => void;
}

export const SelectedDecadeFiltersContext = createContext<SelectedDecadeFiltersContextProps | undefined>(undefined);

export const SelectedDecadeFiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDecadeFilters, setSelectedDecadeFilters] = useState<string[]>([]);

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
