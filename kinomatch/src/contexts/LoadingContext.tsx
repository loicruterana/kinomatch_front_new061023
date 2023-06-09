import React, { createContext, useState, ReactNode } from 'react';

// Création du contexte
interface LoadingContextType {
  isLoading: boolean;
  load: () => void;
  unload: () => void;
  error: string | null;
  addError: (error: string) => void;
}

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  load: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unload: () => {},
  error: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addError: () => {},
});
// Fournisseur de contexte
interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = (): void => {
    setIsLoading(true);
  };

  const unload = (): void => {
    setIsLoading(false);
  };

  const addError = (error: string): void => {
    setError(error);
  };

  const contextValue: LoadingContextType = {
    isLoading,
    load,
    unload,
    error,
    addError,
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
