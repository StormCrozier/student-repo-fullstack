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



app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
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
