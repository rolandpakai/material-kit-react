
export const getPercentage = (fraction: number, denominator: number): number => {  
  let percentage = 0;

  if (fraction > 0 && denominator > 0) {
    percentage = Math.round((fraction / denominator) * 100);
  }

  return percentage;
}