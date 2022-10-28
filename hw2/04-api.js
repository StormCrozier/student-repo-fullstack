/* eslint-disable no-console */
/** Exercise 04 - API * */

const url = 'https://restcountries.com/v3.1/all';

// Add your code here

// Function to help format large numbers
const nf = Intl.NumberFormat();

// Adds a single element to the dom
const addToDom = (toPrint) => {
  const results = document.getElementById('results');
  const entry = document.createElement('li');
  entry.appendChild(document.createTextNode(toPrint));
  results.appendChild(entry);
};

// Function to add error message to screen
const addErrorToDom = (toPrint) => {
  const toGet = document.getElementById('results').parentElement;
  console.log(toGet);
  const results = document.createElement('div');
  const entry = document.createElement('h1');
  entry.style.color = 'red';
  entry.textContent = toPrint;
  results.appendChild(entry);
  toGet.appendChild(results);
};

// Function that uses fetch to retrieve data and add it to the dom
const getData = (uRL) => {
  fetch(uRL)
    .then((resp) => resp.json())
    .then((data) => {
      const size = data.length;
      data.sort(((a, b) => {
        if (a.name.common < b.name.common) {
          return -1;
        }
        if (a.name.common > b.name.common) {
          return 1;
        }
        return 0;
      }));
      for (let i = 0; i < size; i += 1) {
        const toPrint = `${data[i].name.common} - ${nf.format(data[i].population)}`;
        addToDom(toPrint);
      }
    })
    .catch((error) => {
      console.error(error);
      addErrorToDom('An Error Occurred');
    });
};

getData(url);
