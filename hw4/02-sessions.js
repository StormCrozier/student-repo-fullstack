const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5001;

// Add your code here

const prevRoutes = (arr) => {
  const size = arr.length;
  results = '';
  for(let i = 0; i < size; i += 1){
    results += `<li>${arr[i]}</li>`;
  }
  return results;
};

// Use the express-session module
app.use(session({
  store: new session.MemoryStore(),
  secret: 'a secret to sign the cookie',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 86400000,
  },
}));

app.get('*', (req, res) => {
  res.status(200);
  console.log(req.url);
  res.set({ 'Content-Type': 'text/html' });
  res.write(`Current route: ${req.url}`);
  console.log(req.session.routes);
  if(req.session.routes === undefined){
    req.session.routes = [];
    req.session.routes.push(req.url);
  }
  else {
    previousRoutes = prevRoutes(req.session.routes);
    res.write('<h1>Previously visited: </h1>')
    res.write(`<ul style='list-style-type:none'>${previousRoutes}<ul>`)
    req.session.routes.push(req.url);
  }
  res.end();
});
app.get('/favicon', (req, res) => {
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
