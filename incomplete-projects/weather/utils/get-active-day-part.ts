export const getActiveDayPart = ({
  morning: morningDate,
  afternoon: afternoonDate,
  evening: eveningDate,
  night: nightDate,
  currentDate,
}: {
  morning: Date;
  afternoon: Date;
  evening: Date;
  night: Date;
  currentDate: Date;
}) => {
  const morning = morningDate.getTime();
  const noon = afternoonDate.getTime();
  const evening = eveningDate.getTime();
  const night = nightDate.getTime();

  const now = currentDate.getTime();

  if (now >= morning && now < noon) return 'morning';
  if (now >= noon && now < evening) return 'afternoon';
  if (now >= evening && now < night) return 'evening';

  return 'night';
};
