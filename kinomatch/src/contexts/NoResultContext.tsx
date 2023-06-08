import React, { createContext, useState, ReactNode } from 'react';

// Définition du type NoResultContextType
interface NoResultContextType {
  handleNoResult: () => void;
  noResult: boolean;
}

// Création du contexte
export const NoResultContext = createContext<NoResultContextType>({} as NoResultContextType);

// Fournisseur de contexte
interface NoResultProviderProps {
  children: ReactNode;
}

export const NoResultProvider: React.FC<NoResultProviderProps> = ({ children }) => {
  const [noResult, setNoResult] = useState(false);

  const handleNoResult = () => {
    setNoResult(!noResult);
  };

  const contextValue: NoResultContextType = {
    handleNoResult,
    noResult,
  };

  return (
    <NoResultContext.Provider value={contextValue}>
      {children}
    </NoResultContext.Provider>
  );
};

export default NoResultProvider;
