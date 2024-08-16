export const getFileExtension = (fileName: string) => {
  const match = fileName.match(/\.([a-z]+)$/i);
  return match ? match[1] : 'unknown';
};
