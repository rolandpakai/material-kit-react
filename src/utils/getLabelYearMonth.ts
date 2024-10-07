import dayjs from "dayjs";

export const getLabelYearMonth = (monthDiff: number, format: string): string => {  
  let label = "";

  let year = dayjs().get('year');
  let month = dayjs().get('month') + monthDiff;

  if (month === -1) {
    year = year - 1;
    month = 11;
  }

  label = dayjs().set('year', year).set('month', month).format(format);

  return label;
}