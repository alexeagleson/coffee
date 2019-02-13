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
  const response = { message: `Server successfully acknowledges receipt.` };
  res.setHeader('Content-Type', 'application/json');
  res.send(response);
});

app.get('/review', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(review);
});

app.get('/vendor-list', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const allVendors = {
    allVendors: [
      { vendorName: 'FEWER KIA ', vendorID: 74037 },
      { vendorName: 'PENNEY KIA ', vendorID: 74004 },
      { vendorName: 'CENTENNIAL KIA ', vendorID: 73040 },
      { vendorName: 'DISCOVER KIA ', vendorID: 73005 },
      { vendorName: 'FORBES KIA BRIDGEWATER ', vendorID: 71039 },
      { vendorName: "O'REGAN'S KIA HALIFAX ", vendorID: 71034 },
      { vendorName: 'FORBES KIA ', vendorID: 71017 },
      { vendorName: 'DUBE KIA ', vendorID: 62077 },
      { vendorName: 'KIA STE-FOY ', vendorID: 62069 },
      { vendorName: 'KIA QUEBEC ', vendorID: 62068 },
      { vendorName: 'ST-ONGE KIA ', vendorID: 62058 },
      { vendorName: 'MAISON KIA DOLBEAU-MISTASSINI ', vendorID: 62041 },
      { vendorName: 'KIA HAROLD AUTO ', vendorID: 62002 },
      { vendorName: 'GATINEAU KIA ', vendorID: 61116 },
      { vendorName: 'KIA DESROSIERS ', vendorID: 61089 },
      { vendorName: 'VILLE-MARIE KIA ', vendorID: 61082 },
      { vendorName: 'COMPLEXE KIA ', vendorID: 61067 },
      { vendorName: 'ACTION KIA ', vendorID: 61061 },
      { vendorName: 'KIA OF TIMMINS ', vendorID: 54049 },
      { vendorName: 'ORLEANS KIA ', vendorID: 53134 },
      { vendorName: 'KIA 417 ', vendorID: 53133 },
      { vendorName: 'KIA ON HUNT CLUB ', vendorID: 53112 },
      { vendorName: 'LINDSAY KIA ', vendorID: 53100 },
      { vendorName: 'GRIMSBY KIA ', vendorID: 52123 },
      { vendorName: 'WATERLOO KIA ', vendorID: 52121 },
      { vendorName: 'GUELPH KIA ', vendorID: 52107 },
      { vendorName: 'KIA OF ST CATHARINES ', vendorID: 52105 },
      { vendorName: 'ANDERSON KIA ', vendorID: 52093 },
      { vendorName: "LONDON'S AIRPORT KIA ", vendorID: 52092 },
      { vendorName: 'NORTH YORK KIA ', vendorID: 51131 },
      { vendorName: 'WEST TORONTO KIA ', vendorID: 51129 },
      { vendorName: 'PAUL COFFEY KIA ', vendorID: 51098 },
      { vendorName: 'FOSTER KIA ', vendorID: 51086 },
      { vendorName: 'PLANET KIA ', vendorID: 41005 },
      { vendorName: 'KIA OF SASKATOON ', vendorID: 31002 },
      { vendorName: 'EASTSIDE KIA ', vendorID: 22020 },
      { vendorName: 'GO KIA SOUTH ', vendorID: 21014 },
      { vendorName: 'KIA OF BROCKVILLE ', vendorID: 53059 },
      { vendorName: 'TILLSONBURG KIA ', vendorID: 52124 },
    ],
  };
  res.send(allVendors);
});

app.get('/review-dates', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const reviewPeriods = { reviewPeriods: ['November 2017', 'April 2018', 'November 2018', 'April 2019'] };
  res.send(reviewPeriods);
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
