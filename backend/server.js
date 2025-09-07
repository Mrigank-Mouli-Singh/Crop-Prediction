const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 5000;
require('dotenv').config();
// Replace with your actual RapidAPI key
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

app.use(cors());
app.use(express.json());


// Month name to number mapping
const monthMap = {
  January: '01',
  February: '02',
  March: '03',
  April: '04',
  May: '05',
  June: '06',
  July: '07',
  August: '08',
  September: '09',
  October: '10',
  November: '11',
  December: '12',
};

// Month name to short code mapping for humidity
// This is used to fetch humidity data from the NASA API
const monthMapforhumidity = {
  January: 'JAN',
  February: 'FEB',
  March: 'MAR',
  April: 'APR',
  May: 'MAY',
  June: 'JUN',
  July: 'JUL',
  August: 'AUG',
  September: 'SEP',
  October: 'OCT',
  November: 'NOV',
  December: 'DEC',
};
const label=["apple", "banana", "blackgram", "chickpea", "coconut", "coffee", "cotton", "grapes", "jute", "kidneybeans", "lentil", "maize", "mango", "mothbeans", "mungbean", "muskmelon", "orange", "papaya", "pigeonpeas", "pomegranate", "rice", "watermelon"]

async function predictCrop(features) {
    try {
        const response = await axios.post('http://127.0.0.1:50001/predict', features);
        return response.data.prediction;
    } catch (err) {
        console.error('Error calling Flask API:', err.response?.data || err.message);
        throw err;
    }
}

const getHumidityByLocation = async (lat, lon,monthName) => {
  const url = `https://power.larc.nasa.gov/api/temporal/climatology/point`;
  const params = {
    parameters: 'RH2M',         // Relative Humidity at 2 meters
    community: 'AG',            // Agricultural community
    latitude: lat,
    longitude: lon,
    format: 'JSON'
  };

  const response = await axios.get(url, { params });
  const month=monthMapforhumidity[monthName];
  return response.data.properties.parameter.RH2M[month]; // { JAN: %, FEB: %, ... }
};

async function getMonthlyWeather(lat, lon, monthName) {
  const monthNum = monthMap[monthName];
  if (!monthNum) throw new Error('Invalid month name');

  const currentYear = new Date().getFullYear();
  const year = currentYear - 1; // fetch for last year
  const targetMonth = `${year}-${monthNum}`;

  const start = `${year}-01-01`;
  const end = `${year}-12-31`;

  const url = 'https://meteostat.p.rapidapi.com/point/monthly';
  const params = {
    lat,
    lon,
    start,
    end,
    model: 'true',
    units: 'metric',
  };
  const headers = {
    'x-rapidapi-host': 'meteostat.p.rapidapi.com',
    'x-rapidapi-key': RAPIDAPI_KEY,
  };
  const response = await axios.get(url, { params, headers });
  const monthlyData = response.data.data;

  if (!monthlyData || monthlyData.length === 0) {
    throw new Error('No weather data found for this location/year');
  }
  const weather = monthlyData.find((entry) => entry.date.startsWith(targetMonth));
  if (!weather) {
    throw new Error(`No weather data for ${targetMonth}`);
  }
  return weather;
}

app.post('/predict', async (req, res) => {
  try {
    const { N, P, K, ph, latitude, longitude, month } = req.body;

    if (![N, P, K, ph, latitude, longitude, month].every(Boolean)) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const weather = await getMonthlyWeather(latitude, longitude, month);
    const humidity=await getHumidityByLocation(latitude, longitude, month);//relative humidity in %
    const temp=weather["tavg"];//celsius
    const rainfall=weather["prcp"];//mm
    const features = {
    N,
    P,
    K,
    temperature:temp,
    humidity,
    ph,
    rainfall,
     };
     console.log(features);
    const predict=await predictCrop(features);
    let crop = label[predict];
    res.json({
      crop,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message || 'Failed to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`🌱 Server running at http://localhost:${port}`);
});
