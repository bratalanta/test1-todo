import React, { useRef, useState } from 'react';
import { Collection, FILES_LIMIT, TaskStatus, TaskTextLimit } from '../../../const';
import useTask from '../../../hooks/useTask';
import TaskType from '../../../types/task';

/**
 * Компонент редактирования задачи
 *
 * @param {TaskType} [task] - Задача (опционально)
 * @returns {React.ReactNode} - вернет компонент
 */
function TaskEdit({ task }) {
  const filePicker = useRef(null);
  const { Field } = Collection;
  const [formData, setFormData] = useState({
    [Field.Title]: task ? task.title : '',
    [Field.Deadline]: task ? task.deadline : '',
    [Field.Description]: task ? task.description : '',
    [Field.Files]: task ? task.files : []
  });
  const [taskStatus, setTaskStatus] = useTask(formData, task);

  const handleFormFieldChange = ({ target }) => {
    if (target.files && target.files.length > FILES_LIMIT) {
      return;
    }

    setFormData({
      ...formData,
      [target.name]: target.files ? target.files : target.value
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const isFormInvalid = Object.values(formData).some((value) => !value.length);

    if (isFormInvalid) {
      return;
    }

    setTaskStatus(TaskStatus.Saving);
  };

  return (
    <>
      <div className="overlay" />
      <article className="main__task task task--edit">
        <form className="task-form" onSubmit={handleSubmit}>
          <div className="task-form__content">
            <label className="task-form__label" htmlFor="title">
              <input
                className="task-form__title-input task-form--field"
                name={Field.Title}
                value={formData.title}
                onChange={handleFormFieldChange}
                type="text"
                placeholder="Тема"
                maxLength={TaskTextLimit.Title}
              />
              <span className={`task-form__star ${formData.title ? 'hidden' : null}`}>*</span>
            </label>
            <label className="task-form__label" htmlFor="description">
              <textarea
                className="task-form__description task-form--field"
                name={Field.Description}
                value={formData.description}
                placeholder="Нужно сделать.."
                maxLength={TaskTextLimit.Description}
                onChange={handleFormFieldChange}
              />
              <span className={`task-form__star ${formData.description ? 'hidden' : null}`}>*</span>
            </label>
            <label className="task-form__label" htmlFor="date">
              Дедлайн:
              <input
                className="task-form__date-input task-form--field"
                value={formData.deadline}
                name={Field.Deadline}
                type="date"
                onChange={handleFormFieldChange}
              />
              <span className={`task-form__star ${formData.deadline ? 'hidden' : null}`}>*</span>
            </label>
            <label className="task-form__label" htmlFor="files">
              <button
                className="task-form__file-upload"
                type="button"
                onClick={() => filePicker.current.click()}>
                Загрузить файлы
              </button>
              <input
                className="hidden"
                name={Field.Files}
                type="file"
                accept=".docx,.pdf,text/plain"
                multiple
                ref={filePicker}
                onChange={handleFormFieldChange}
              />
              Выбрано: {formData.files.length}
              <span className={`task-form__star ${formData.files.length ? 'hidden' : null}`}>
                *
              </span>
              <span className="task-form__limit">Максимум: {FILES_LIMIT}</span>
            </label>
          </div>
          <div className="form-controls">
            <button
              className="form-controls__item form-controls__item--submit"
              type="submit"
              disabled={taskStatus !== TaskStatus.Idle}>
              {taskStatus === TaskStatus.Saving ? 'СОХРАНЯЮ...' : 'СОХРАНИТЬ'}
            </button>
            <button
              className="form-controls__item form-controls__item--delete"
              type="button"
              disabled={taskStatus !== TaskStatus.Idle}
              onClick={() => setTaskStatus(TaskStatus.Deleting)}>
              {taskStatus === TaskStatus.Deleting ? 'УДАЛЯЮ...' : 'УДАЛИТЬ'}
            </button>
          </div>
        </form>
      </article>
    </>
  );
}

export default TaskEdit;
