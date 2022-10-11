/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/** Exercise 02 - Reverse * */

// Add your code here

// Function to reverse input
const reverse = (input) => {
  let toReturn = '';
  let temp = [];
  temp = input.toString();
  temp = temp.split('');
  if (temp.length >= 9 || temp.length <= 7) {
    toReturn = 'Error: Please enter an 8-digit number';
  } else {
    temp = temp.reverse();
    temp = temp.join('');
    toReturn = `${input} --> ${temp}`;
  }
  const currentDiv = document.getElementById('here');
  currentDiv.textContent = toReturn;
  currentDiv.style.color = 'red';
  currentDiv.style.marginTop = '15px';
};
