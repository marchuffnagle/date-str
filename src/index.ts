interface DateStrBrand { _type: 'DateStr'; }

export type DateStr = string & DateStrBrand;

const MONTHS_WITH_31_DAYS: ReadonlyArray<number> = [1, 3, 5, 7, 8, 10, 12];
const MONTHS_WITH_30_DAYS: ReadonlyArray<number> = [4, 6, 9, 11];

// From Wikipedia: These extra days occur in each year which is an integer
// multiple of 4 (except for years evenly divisible by 100, but not by 400).
function isLeapYear(year: number): boolean {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  return year % 4 === 0;
}

export function isDateStr(str: unknown): str is DateStr {
  if (typeof str !== 'string') return false;

  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (match === null) return false;

  const year = Number.parseInt(match[1] as string);
  const month = Number.parseInt(match[2] as string);
  const date = Number.parseInt(match[3] as string);

  // Validate the month
  if (month < 1 || month > 12) return false;

  // Validate the date
  if (date < 1) return false;

  if (MONTHS_WITH_31_DAYS.includes(month) && date > 31) return false;

  if (MONTHS_WITH_30_DAYS.includes(month) && date > 30) return false;

  // Handle February
  if (month === 2 && isLeapYear(year) && date > 29) return false;
  if (month === 2 && !isLeapYear(year) && date > 28) return false;

  return true;
}

export function toDateStr(date: string | Date): DateStr {
  if (typeof date === 'string') {
    if (isDateStr(date)) return date;
    throw new TypeError(`"${date}" is not a valid date`);  
  }
  
  return date.toISOString().split('T')[0] as DateStr;
}
