const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const { wrangleLocationResponse, wrangleWeatherResponse } = require('./wrangle.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging



app.get('/location', async(req, res) => {
  const city = req.query.search;

  const data = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${city}&format=json`);
  
  
  const mungedData = wrangleLocationResponse(data.body);
  res.json(mungedData);

});
app.get('/weather', async(req, res) => {
  try {
    const { latitude, longitude } = req.query;
    
    const response = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_KEY}`);
    
    const wrangleWeather = wrangleWeatherResponse(response.body);
    res.json(wrangleWeather);

  } catch(e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = app;
