export const getNoonTime = (
  sunriseTime: string | Date,
  daylightDurationSeconds: number,
) => {
  // Convert sunrise time to a Date object if needed
  if (typeof sunriseTime === 'string') {
    sunriseTime = new Date(sunriseTime);
  }

  // Calculate noon time by adding half of daylight duration (in milliseconds) to sunrise
  const noonTime = new Date(
    sunriseTime.getTime() + daylightDurationSeconds * 0.5 * 1000,
  );

  return noonTime;
};
