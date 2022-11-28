import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

dayjs.locale('ru');
/**
 * Форматирование даты
 *
 * @param {string} date - дата
 * @param {string} format - формат, например ('YYYY-MMMM')
 * @returns {string} - возвращает отформатированную дату
 */
export const formatDate = (date, format) => dayjs(date).format(format);

/**
 * Высчитывает, не просрочена ли задача
 *
 * @param {string} date - дата
 * @returns {boolean} - если true - то просрочена, иначе не просрочена
 */
export const isExpired = (date) => {
  const currentDate = dayjs();
  const taskDate = dayjs(date);

  return currentDate.diff(taskDate, 'day') > 0;
};
