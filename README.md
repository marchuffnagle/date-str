# date-str

> Safely work with ISO-8601 dates in TypeScript

Working with the concept of "just a date" in JavaScript can be a challenge, as the built-in Date type actually represents a date _and_ a time. When you mix in time zones, properly extracting the correct date from the `Date` object can lead to errors. The best solution I've found is, when I need to work with a date, to store it as an [ISO-8601 date string](https://en.wikipedia.org/wiki/ISO_8601#Dates).

⚠️ **Note:** Although `YYYYMMDD` is technically a valid date representation according to ISO-8601, this library only works with dates of the format `YYYY-MM-DD`.

This pacakge adds a [branded type](https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/) representing an ISO-8601 date.

This package is based on a these excellent articles published on the [Atomic Object Blog](https://spin.atomicobject.com/):

- [DateStr – A Strongly-Typed Date String for TypeScript](https://spin.atomicobject.com/2017/06/19/strongly-typed-date-string-typescript/)
- [Flavoring: Flexible Nominal Typing for TypeScript](https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/)

## Installation

```sh
npm install date-str
```

## Usage

### ES Module

```js
import { DateStr, isDatestr, toDateStr } from 'date-str';
```

### CommonJS

```js
const { DateStr, isDateStr, toDateStr } = require('date-str');
```

### Example

```js
interface Person {
  name: string,
  birthday: DateStr
}

const ralph: Person = {
  name: 'Ralph',
  birthday: toDateStr(new Date())
}

function datePrinter(date: DateStr | Date) {
  if (isDateStr(date)) {
    console.log(date);
  } else {
    console.log(date.toISOString())
  }
}
```

## API

### isDateStr(str: unknown) => date is DateStr

Test if a value is a valid date string of the format `YYYY-MM-DD`.

### toDateStr(date: string | Date) => DateStr

Parses a date string or JS Date object into a DateStr. Throws a `TypeError` if the date is not a valid value. If `date` is a string, it must be of the format `YYYY-MM-DD`.
