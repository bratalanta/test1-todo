/**
 * Файл
 *
 * @typedef {object} File
 * @property {string} name - имя файла
 * @property {string} url - ссылка на файл в firebase
 */

/**
 * Задача
 *
 * @typedef {object} TaskType
 * @property {string} id - id задачи
 * @property {string} title - заголовок
 * @property {string} description - описание
 * @property {string} deadline - дедлайн
 * @property {File[]} files - файлы
 * @property {boolean} isDone - выполнена ли задача
 */

/**
 * Форма задачи (может принимать данные из пропса при редактировании задачи)
 *
 * @typedef {object} FormData
 * @property {string} title - заголовок
 * @property {string} description - описание
 * @property {string} deadline - дедлайн
 * @property {File[]} files - файлы
 */
