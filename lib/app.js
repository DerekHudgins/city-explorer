const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const { wrangleLocationResponse } = require('./wrangle.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging



app.get('/location', async(req, res) => {
  const city = req.query.search;

  const data = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_KEY}&q=${city}&format=json`);
  
  
  const mungedData = wrangleLocationResponse(data.body);
  res.json(mungedData);

});

module.exports = app;
