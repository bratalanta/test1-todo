import React from 'react';
import TaskLinks from './TaskLinks/TaskLinks';
import { formatDate, isExpired } from '../../../utils/utils';
import { updateTask } from '../../../api/firebase';
import { useApp } from '../../../contexts/AppProvider/AppProvider';

function Task({ task }) {
  const { description, title, files, deadline, id, isDone } = task;
  const { setTaskEditId } = useApp();
  const isTaskExpired = isExpired(deadline);

  const taskCn = `main__task task task--view ${isTaskExpired && !isDone ? 'task--expired' : null}
    ${isDone ? 'task--done' : null}`;

  const handleDoneButtonClick = async () => {
    await updateTask(id, {
      ...task,
      isDone: true
    });
  };

  return (
    <article className={taskCn}>
      <div className="task__body">
        <header className="task__header task-header">
          <button className="task-header__button" type="button" onClick={() => setTaskEditId(id)}>
            Изменить
          </button>
          <button
            className={`task-header__button ${isDone ? 'task-header__button--done' : null}`}
            type="button"
            disabled={isDone}
            onClick={handleDoneButtonClick}>
            Выполнено
          </button>
        </header>
        <div className="task__content task-content">
          <h4 className="task-content__title">{title}</h4>
          <p className="task-content__description task-description">{description}</p>
          <TaskLinks files={files} />
        </div>
        <footer className="task-footer">
          <span
            className={`task-footer__deadline ${
              isTaskExpired && !isDone ? 'task-footer__deadline--expired' : null
            }`}>
            {formatDate(deadline, 'D MMMM')}
          </span>
        </footer>
      </div>
    </article>
  );
}

export default Task;
