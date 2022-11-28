import React, { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

/**
 * Провайдер для хранения стейта добавления задачи и назначения id задачи, которая в данный момент редактируется
 *
 * @param {React.ReactNode} children - будем прокидывать пропсом все приложение
 * @returns {React.ReactNode} - вернет компонент
 */
function AppProvider({ children }) {
  const [isAdding, setIsAdding] = useState(false);
  const [taskEditId, setTaskEditId] = useState(null);

  const contextValue = useMemo(
    () => ({ isAdding, setIsAdding, taskEditId, setTaskEditId }),
    [isAdding, taskEditId]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

/**
 * Хук для использования AppContext
 *
 * @returns {React.Context} - вернет AppContext
 */
function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp should work with AppContext');
  }

  return context;
}

export { AppProvider, useApp };
