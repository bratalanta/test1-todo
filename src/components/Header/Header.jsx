import React from 'react';
import { useApp } from '../../contexts/AppProvider/AppProvider';

/**
 * Хэдер всей страницы
 *
 * @returns {React.ReactNode} - вернет компонент
 */
function Header() {
  const { setIsAdding } = useApp();

  return (
    <header className="page-header _container">
      <h1 className="page-header__title">TODO List</h1>
      <button className="page-header__add-task" type="button" onClick={() => setIsAdding(true)}>
        + ДОБАВИТЬ ЗАДАЧУ
      </button>
    </header>
  );
}

export default Header;
