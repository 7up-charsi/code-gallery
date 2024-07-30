export const wait = async (durationInMS = 1000) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, durationInMS);
  });
};
