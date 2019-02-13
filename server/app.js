require('dotenv').config();

const history = require('connect-history-api-fallback');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

// CORS middleware
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

const app = express();
const distPath = path.join(__dirname, '..', 'dist');
const port = process.env.PORT;

const review = require('./content/review');

app.use(express.static(distPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);
app.use(history());

app.post('/submit-update', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const completeCount = req.body.vendors[0].reviews[0].reviewContents.answers.length;
  const response = {  message: `Server successfully acknowledges receipt of ${completeCount} completed questions.`}
  res.send(response);
});


app.get('/review', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(review);
});

app.get('/*', (req, res) => {
  res.status(200).sendFile(distPath + '/index.html');
});

app.listen(port, () => {
  console.log(`Dealer 2.0 is listening on port ${port}!`);
});

process.on('SIGINT', () => {
  process.exit();
});
