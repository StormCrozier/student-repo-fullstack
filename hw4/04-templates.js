const express = require('express');
const axios = require('axios');
const { json } = require('body-parser');

const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// REST Countries URL
const url = 'https://restcountries.com/v3.1/all';
//Function to format large numbers
const nf = Intl.NumberFormat();
let countryData = [];

const getData = async () => {
  try{
    const results = await axios.get(url);
    results.data.forEach(el => {
     countryData.push(el);
    });
  }
  catch(error){ 
    console.log(error);
  }
};
getData();

app.get('/', (req, res) => {
  // render pug template for the index.html file
  res.render('index', {
    heading: 'Countries of the World',
    main: 'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world',
  });
});

app.get('/capitals', (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array

  // let countries = ['Afghanistan', 'Aland Islands', 'Albania'];
  const countries = countryData.map((country) => {
    return `${country.name.common} - ${country.capital}`
  })
  countries.sort();
  res.render('page', {
    heading: 'Countries and Capitals',
    results: countries,
  });
});

app.get('/populous', (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population

  //let populous = ['China', 'India', 'United States of America'];
  let populous = countryData.filter((country) => country.population > 50000000);
  populous = populous.sort((a, b) => {
    if (a.population > b.population) {
      return -1;
    }
    if (a.name.population < b.population) {
      return 1;
    }
    return 0;
  });
  populous = populous.map((country) => {
    return `${country.name.common} -  ${nf.format(country.population)}`
  })
  res.render('page', {
    heading: 'Most Populous Countries',
    results: populous,
  });
});

app.get('/regions', (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array

  const regions = []
  let asia = 0;
  let america = 0;
  let africa = 0;
  let europe = 0;
  let oceania = 0;
  let polar = 0;

  //let regions = ['Asia - 50', 'Europe - 53', 'Africa - 60'];
  const region = countryData.reduce((prev, curr) => {
    if(curr.region === 'Americas')
      america += 1;
    else if (curr.region === 'Asia')
      asia += 1;
    else if (curr.region === 'Africa'){
      africa += 1;
    }
    else if ( curr.region === 'Europe'){
      europe += 1;
    }
    else if (curr.region === 'Oceania'){
      oceania += 1;
    }
    else polar += 1;
  });

  regions.push(`Asia - ${asia}`);
  regions.push(`America - ${america}`);
  regions.push(`Africa - ${africa}`);
  regions.push(`Europe - ${europe}`);
  regions.push(`Oceania - ${oceania}`);
  regions.push(`Polar - ${polar}`);

  res.render('page', {
    heading: 'Regions of the World',
    results: regions,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
