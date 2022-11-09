const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));
app.use('/index', express.static('public/files'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß

app.use(
  express.urlencoded({
    extended: false,
  })
);

const postHTML = `<html><head></head><body>
  <form method='post' action='/submit' accept-charset=utf-8>
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

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
  //res.write(postHTML);
  res.end()
});

// POST request
app.post('/submit', (req, res) => {
  // Add your code here
  res.writeHead(200, { 'Content-Type': 'text/html' });
  let toText = req.body.message;
  const check = req.body.news;
  let toPrint = '';
  if (toText === '') {
    toText = 'n/a';
  }
  if (check === 'on') {
    toPrint = 'Yes, sign me up for the newsletter';
  } else {
    toPrint = 'No, thank you';
  }
  res.write(`<p>Name: ${req.body.name} </p>`);
  res.write(`<p>Email: ${req.body.email} </p>`);
  res.write(`<p>Comments: ${toText} </p>`);
  res.write(`<p>Newsletter: ${toPrint} </p>`);
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
