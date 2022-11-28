import React from 'react';
import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';

/**
 * Главный компонент
 *
 * @returns {React.ReactNode} - вернет компонент
 */
function App() {
  return (
    <div className="page">
      <Header />
      <TaskList />
    </div>
  );
}

export default App;
