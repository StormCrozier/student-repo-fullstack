const http = require('http');
const URLSearchParams = require('url-search-params');

const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const postHTML = `<html><head></head><body>
  <form method='post' accept-charset=utf-8>
  <label for="name">Name: </label>
  <input type="text" name="name" id="name"><br />
  <label for="email">Email: </label>
  <input type="text" name="email" id="email"><br />
  <label for="textInput">Submit your message</label>
  <textarea type="text" name="textInput"id="textInput"></textarea><br />
  <label for=newsLetterInput>Sign up for the newsletter</label>
  <input type=checkbox name="newsLetterInpu" id=newsLetterInput><br />
  <input type='submit'>
  </form></body></html>`;

let body = '';
const server = http.createServer((req, res) => {
  if (req.url === '/form') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    req.on('data', (chunk) => {
      body = '';
      body += chunk;
    });
    req.on('end', () => {
      res.writeHead(200);
      res.end(postHTML);
    });
    res.write(`${postHTML}`);
  } else if (req.url === '/submit') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const newData = new URLSearchParams(body);
    const parsedData = newData.values();
    const [name, email, text, check] = parsedData;
    let toText = text;
    let toPrint = '';
    if (toText === '') {
      toText = 'n/a';
    }
    if (check === 'on') {
      toPrint = 'Yes, sign me up for the newsletter';
    } else {
      toPrint = 'No, thank you';
    }
    res.write(`<p>Name: ${name} </p>`);
    res.write(`<p>Email: ${email} </p>`);
    res.write(`<p>Comments: ${toText} </p>`);
    res.write(`<p>Newsletter: ${toPrint} </p>`);
  }

  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
