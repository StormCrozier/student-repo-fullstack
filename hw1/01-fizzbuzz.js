/* eslint-disable no-console */
/** Exercise 01 - Fizzbuzz

Write a program that writes all the numbers from 1 to 100, with some exceptions:
- For numbers divisible by 3, print “fizz”
- For numbers divisible by 5 (but not 3), print “buzz”
- For numbers divisible by 3 and 5, print “fizzbuzz”

Use console.log() to write the proper output to the command line.

* */

const fizzbuzz = () => {
  let i = 1;
  let toPrint = '';
  for (i; i <= 100; i += 1) {
    if (i % 3 === 0 && i % 5 === 0) {
      toPrint = 'fizzbuzz';
    } else if (i % 3 === 0) {
      toPrint = 'fizz';
    } else if (i % 5 === 0) {
      toPrint = 'buzz';
    } else {
      toPrint = i;
    }
    console.log(toPrint);
  }
};

fizzbuzz();
// 1
// 2
// fizz
// 4
// buzz
// fizz
// 7
// 8
// fizz
// buzz
// 11
// fizz
// 13
// 14
// fizzbuzz
// ...
