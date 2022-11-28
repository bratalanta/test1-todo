import React from 'react';

/**
 * Плашка, если нет задач
 *
 * @returns {React.ReactNode} - вернет компонент
 */
function TaskListEmpty() {
  return <div className="board__empty">Все дела сделаны</div>;
}

export default TaskListEmpty;
