import dayjs from 'dayjs';

const convertTime = (time: string | null) => {
  if (!time) {
    return '';
  }

  return dayjs(time).format('YYYY MM-DD HH:mm');
};

export { convertTime };
