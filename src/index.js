const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Moooo!');
});

app.get('/big', (req, res) => {
  res.send('Big mooooooooooooooooooo!');
});

app.get('/auth', (req, res) => {
  res.status(401).send('Not authorized moooo!');
});

app.get('/error', (req, res) => {
  res.status(500).send('Server error moooo!');
});

app.listen(port, () => {
  console.log(`Moo server running at http://localhost:${port}`);
});
