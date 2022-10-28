/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/** Exercise 03 - Form * */

// Add your code here

// Function to get data by the dom and print to the console
const onSubmit = () => {
  const user = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  const text = document.getElementById('textInput').value;
  const newsLet = document.getElementById('newsLetterInput').checked;
  const but = document.getElementById('sub');
  let toPrint = '';
  let feedback = '';

  if (newsLet) {
    toPrint = 'Yes, I would like to join the newsletter.';
  } else {
    toPrint = 'No, thank you.';
  }

  if (!text) {
    feedback = 'No feedback was submitted';
  } else {
    feedback = text;
  }

  console.log('======= Form Submission =======');
  console.log('Name:', user);
  console.log('Email:', email);
  console.log('Feedback:', feedback);
  console.log('Newsletter:', toPrint);

  but.disabled = true;
};

// Function to enable submit button when both name and email inputs have values.
const enableSubmit = () => {
  const user = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  const but = document.getElementById('sub');

  let valid = true;

  if (user.trim() === '' || user === null) {
    valid = false;
  } else if (email.trim() === '' || email === null) {
    valid = false;
  }

  but.disabled = !valid;
};
