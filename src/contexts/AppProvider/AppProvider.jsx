import React, { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

function AppProvider({ children }) {
  const [isAdding, setIsAdding] = useState(false);
  const [taskEditId, setTaskEditId] = useState(null);

  const contextValue = useMemo(
    () => ({ isAdding, setIsAdding, taskEditId, setTaskEditId }),
    [isAdding, taskEditId]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp should work with AppContext');
  }

  return context;
}

export { AppProvider, useApp };
