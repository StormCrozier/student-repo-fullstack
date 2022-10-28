/* eslint-disable no-console */
/** Exercise 01 - Coins * */

/**
 * Removes as many dollars as possible and returns
 * amount removed and amount remaing
 */
const removeDollar = (num) => {
  let dollars = 0;
  let rem = num;
  while (rem > 100) {
    rem -= 100;
    dollars += 1;
  }
  return [dollars, rem];
};

/**
 * Removes as many quarters as possible and returns
 * amount removed and amount remaing
 */
const removeQuart = (num) => {
  let quarters = 0;
  let rem = num;
  while (rem > 25) {
    rem -= 25;
    quarters += 1;
  }
  return [quarters, rem];
};

/**
 * Removes as many dimes as possible and returns
 * amount removed and amount remaing
 */
const removeDime = (num) => {
  let dimes = 0;
  let rem = num;
  while (rem > 10) {
    rem -= 10;
    dimes += 1;
  }
  return [dimes, rem];
};

/**
 * Removes as manu nickels as possible and returns
 * amount removed and amount remaing
 */
const removeNickel = (num) => {
  let nickels = 0;
  let rem = num;
  while (rem > 5) {
    rem -= 5;
    nickels += 1;
  }
  return [nickels, rem];
};

/**
 * Removes as many pennies as possible and returns
 * amount removed and amount remaing
 */
const removePenny = (num) => {
  let pennies = 0;
  let rem = num;
  while (rem >= 1) {
    rem -= 1;
    pennies += 1;
  }
  return pennies;
};

// Formats the string according to amount of change
const formatChange = (dollars, quarters, dimes, nickels, pennies) => {
  let toPint = '';
  if (dollars !== 0) {
    if (dollars > 1) {
      toPint += `${dollars} dollars, `;
    } else {
      toPint += `${dollars} dollar, `;
    }
  }
  if (quarters !== 0) {
    if (quarters > 1) {
      toPint += `${quarters} quarters, `;
    } else {
      toPint += `${quarters} quarter, `;
    }
  }
  if (dimes !== 0) {
    if (dimes > 1) {
      toPint += `${dimes} dimes, `;
    } else {
      toPint += `${dimes} dime, `;
    }
  }
  if (nickels !== 0) {
    if (nickels > 1) {
      toPint += `${nickels} nickels, `;
    } else {
      toPint += `${nickels} nickel, `;
    }
  }
  if (pennies !== 0) {
    if (pennies > 1) {
      toPint += `${pennies} pennies`;
    } else {
      toPint += `${pennies} penny`;
    }
  }
  return toPint;
};

// Takes money input and converts to change
const calculateChange = (input) => {
  // Add your code here
  const tot = input * 100;
  if (tot > 1000) {
    return 'Error: the number is too large';
  }
  const [dollars, dolRem] = removeDollar(tot);
  const [quarters, quartRem] = removeQuart(dolRem);
  const [dimes, dimeRem] = removeDime(quartRem);
  const [nickels, nickRem] = removeNickel(dimeRem);
  const pennies = removePenny(nickRem);
  const toPrint = formatChange(dollars, quarters, dimes, nickels, pennies);
  return toPrint;
};

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
