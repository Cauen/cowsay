const express = require('express');
const app = express();
const port = 3000;

function runGc() {
  if (!global.gc) {
    return { error: "Garbage collection is not exposed" }
  }

  console.log('Garbage collection');
  const before = process.memoryUsage();
  global.gc();
  const after = process.memoryUsage();
  console.log(before);
  console.log(after);

  return { before, after }
}

function scheduleGc() {
  // schedule next gc within a random interval (e.g. 15-45 minutes)
  // tweak this based on your app's memory usage
  var nextMinutes = Math.random() * 30 + 15;

  setTimeout(function(){
    runGc()
    console.log('Manual gc', process.memoryUsage());
    scheduleGc();
  }, nextMinutes * 60 * 1000);
}

scheduleGc()

app.get('/', (req, res) => {
  res.send('Express moooo!');
});

app.get('/gc', (req, res) => {
  res.json(runGc());
});

app.get('/memory', (req, res) => {
  res.json(process.memoryUsage());
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
