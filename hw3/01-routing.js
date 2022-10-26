const http = require('http');

const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5001/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    'welcome',
    'redirect',
    'redirected',
    'cache',
    'cookie',
    'check-cookies',
    'other',
  ];

  const getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`),
    );

    return result;
  };

  if (req.url === '/') {
    const routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Exercise 01</h1>');
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  } else if (req.url === '/welcome') { // Route for welcome page
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Welcome to Homework 3 exercise 1</h1>');
    res.end();
  } else if (req.url === '/redirect') { // Route for redirect
    res.writeHead(302, { location: '/redirected' });
    res.end();
  } else if (req.url === '/redirected') { // Route for redirected page
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>You have been redirected</h1>');
    res.end();
  } else if (req.url === '/cache') { // Route for cache page
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=<86400>',
    });
    res.write('This resource was cached');
    res.end();
  } else if (req.url === '/cookie') { // Route for cookie page, sets a cookie
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Set-Cookie': 'hello=world',
    });
    res.write('cookies... yummmm');
    res.end();
  } else if (req.url === '/check-cookies') { // Route for check-cookies
    let print = false;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    let cookies = req.headers.cookie;
    cookies = cookies.split(';');
    cookies.forEach((i) => {
      if (i === ' hello=world') { print = true; }
    });
    const toPrint = print ? res.write('Yes') : res.write('No'); // Prints yes or no based on cookies
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' }); // Handles anyother route
    res.write('<h1>404 Page not found</h1>');
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
