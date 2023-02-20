export const isEmpty = (str: any): boolean => {
  return typeof str !== 'string' || !str || str.length === 0 || !str.trim();
};
