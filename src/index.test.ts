import { isDateStr, toDateStr } from './index';

test('isDateStr() returns true for valid values', () => {
  expect(isDateStr('2021-01-01')).toBe(true);

  expect(isDateStr('2021-01-31')).toBe(true);
  expect(isDateStr('2021-03-31')).toBe(true);
  expect(isDateStr('2021-05-31')).toBe(true);
  expect(isDateStr('2021-07-31')).toBe(true);
  expect(isDateStr('2021-08-31')).toBe(true);
  expect(isDateStr('2021-10-31')).toBe(true);
  expect(isDateStr('2021-12-31')).toBe(true);

  expect(isDateStr('2021-04-30')).toBe(true);
  expect(isDateStr('2021-06-30')).toBe(true);
  expect(isDateStr('2021-09-30')).toBe(true);
  expect(isDateStr('2021-11-30')).toBe(true);

  // February (in leap years)
  
  // Divisible by 4
  expect(isDateStr('2004-02-29')).toBe(true);

  // Divisible by 100 but also by 400
  expect(isDateStr('2000-02-29')).toBe(true);
});

test('isDateStr() returns false for invalid values', () => {
  // Wrong type
  expect(isDateStr(5)).toBe(false);
  expect(isDateStr(new Date())).toBe(false);

  // Invalid string format
  expect(isDateStr('asdf')).toBe(false);
  expect(isDateStr('2021')).toBe(false);
  expect(isDateStr('2021-08')).toBe(false);
  expect(isDateStr('2021-08-01T00:00:00.000Z')).toBe(false);

  // Invalid months
  expect(isDateStr('2021-00-01')).toBe(false);
  expect(isDateStr('2021-13-01')).toBe(false);

  // Invalid dates
  expect(isDateStr('2021-01-00')).toBe(false);
  
  expect(isDateStr('2021-01-32')).toBe(false);
  expect(isDateStr('2021-03-32')).toBe(false);
  expect(isDateStr('2021-05-32')).toBe(false);
  expect(isDateStr('2021-07-32')).toBe(false);
  expect(isDateStr('2021-08-32')).toBe(false);
  expect(isDateStr('2021-10-32')).toBe(false);
  expect(isDateStr('2021-12-32')).toBe(false);

  expect(isDateStr('2021-04-31')).toBe(false);
  expect(isDateStr('2021-06-31')).toBe(false);
  expect(isDateStr('2021-09-31')).toBe(false);
  expect(isDateStr('2021-11-31')).toBe(false);

  // February (not in leap years)

  // Not divisible by 4
  expect(isDateStr('2021-02-29')).toBe(false);

  // Divisible by 100 but not 400
  expect(isDateStr('1900-02-29')).toBe(false);
});

test('toDateStr() parses a valid date string', () => {
  expect(toDateStr('2020-01-01')).toBe('2020-01-01');
});

test('toDateStr() parses a valid date string', () => {
  expect(toDateStr('2020-01-01')).toBe('2020-01-01');
});

test('toDateStr() throws a TypeError for an invalid date string', () => {
  expect(() => toDateStr('2020-01-32')).toThrow(TypeError);
});

test('toDateStr() parses a Date', () => {
  expect(toDateStr(new Date(2020, 0, 1))).toBe('2020-01-01');
});
