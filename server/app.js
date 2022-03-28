const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const FormData = require('form-data');

dotenv.config({ path: './config.env' });

const app = express();

app.get('/', (req, res) => {
  res.redirect(`https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=${process.env.API_KEY}&redirect_uri=${process.env.REDIRECT_URI}`)
});

app.get('/redirect', function (req, res) {
  res.send('hi!');
  const searchParams = new URLSearchParams();
  const token = (searchParams.has('token')) ? searchParams.get('token') : '';
  const form = new URLSearchParams();
  // const formHeaders = new URLSearchParams();

  form.append('client_id', process.env.API_KEY);
  form.append('client_secret', process.env.CLIENT_SECRET);
  form.append('code', token);
  form.append('redirect_uri', process.env.REDIRECT_URI);
  form.append('grant_type', 'authorization_code');

  console.log(form);

  axios.post('https://www.eventbrite.com/oauth/token', form, { headers: { 'Content-Type' : 'application/x-www-form-urlencoded' } })
  .then(function (response) {
    // TODO: get eventbrite data 
    console.log('hi');
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
});

(async () => {
  try {
    console.log('hi');
  } catch (err) {
    console.log('ERROR 💥');
  }
})();

module.exports = app;