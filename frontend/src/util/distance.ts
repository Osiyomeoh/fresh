export const distance = (x1: number, y1: number, x2: number, y2: number) => {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
};
