const http = require('http');

const port = process.env.PORT || 5001;

const getURLData = (params) => { // Gets data from url and parses it
  const parsed = params.substring(1);
  const strings = parsed.split('&');
  const newStrings = [];
  strings.forEach((str) => {
    newStrings.push(str.split('='));
  });
  return newStrings;
};

const createTableData = (params) => { // Function to create table data and returns html
  let results = '';
  const size = params.length;
  for (let i = 0; i < size; i += 1) {
    results += `<td>${params[i]}</td>`;
  }
  return results;
};

const createTableRow = (params) => { // Function to create table row and return html
  let results = '';
  const size = params.length;
  for (let i = 0; i < size; i += 1) {
    const td = createTableData(params[i]);
    results += `<tr>${td}</tr>`;
  }
  return results;
};

const server = http.createServer((req, res) => {
  const routes = [
    '/attributes?hello=world&lorem=ipsum',
    '/items?first=1&second=2&third=3&fourth=4',
    '/characters?spongebob=squarepants&patrick=star&sandy=cheeks',
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  const urlPathName = url.pathname;
  const getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`),
    );

    return result;
  };

  if (req.url === '/') { // Route for home page
    const routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Exercise 02</h1>');

    res.write(`<ul> ${routeResults} </ul>`);
  } else if (urlPathName === '/attributes') { // Route for path attributes
    const params = url.search;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const newStrings = getURLData(params);
    const tr = createTableRow(newStrings);
    res.write(`<table border= '1'>${tr}</table>`);
  } else if (urlPathName === '/items') { // Route for path items
    const params = url.search;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const newStrings = getURLData(params);
    const tr = createTableRow(newStrings);
    res.write(`<table border= '1'>${tr}</table>`);
  } else if (urlPathName === '/characters') { // Route for path characters
    const params = url.search;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const newStrings = getURLData(params);
    const tr = createTableRow(newStrings);
    res.write(`<table border= '1'>${tr}</table>`);
  } else { // Route for any other url
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>Page not found</h1>');
  }

  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
