export const getActiveHour = (date: Date, currentTime: Date) => {
  const hourStart = date.getTime();
  const hourEnd = date.getTime() + 60 * 60 * 1000;

  const now = currentTime.getTime();

  if (now > hourStart && now < hourEnd) return true;

  return false;
};
