import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export const formatDate = (date, format) => dayjs(date).format(format);
export const isExpired = (date) => {
  const currentDate = dayjs(new Date());
  const taskDate = dayjs(date);

  return taskDate.diff(currentDate) < 0;
};
