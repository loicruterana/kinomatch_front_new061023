import React, { createContext, useState, ReactNode } from 'react';

interface Genre {
  name: string;
  id: string;
}

interface SelectedGenreFiltersContextType {
  selectedGenreFilters: Genre[];
  addGenreFilter: (name: string, genreId: string) => void;
  removeGenreFilter: (name: string) => void;
}

export const SelectedGenreFiltersContext = createContext<SelectedGenreFiltersContextType>(
  {} as SelectedGenreFiltersContextType
);

export const SelectedGenreFiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedGenreFilters, setSelectedGenreFilters] = useState<Genre[]>([]);

  const addGenreFilter = (name: string, genreId: string) => {
    if (selectedGenreFilters.some((f) => f.name === name)) {
      removeGenreFilter(name);
      return;
    }
    setSelectedGenreFilters((state) => [
      ...state,
      {
        name: name,
        id: genreId,
      }
    ]);
  };

  const removeGenreFilter = (name: string) => {
    setSelectedGenreFilters((state) => state.filter((f) => f.name !== name));
  };

  return (
    <SelectedGenreFiltersContext.Provider value={{ selectedGenreFilters, addGenreFilter, removeGenreFilter }}>
      {children}
    </SelectedGenreFiltersContext.Provider>
  );
};

export default SelectedGenreFiltersProvider;
