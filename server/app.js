const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

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
  const formHeaders = new URLSearchParams();

  formHeaders.append('content-type', 'application/x-www-form-urlencoded');
  form.append('client_id', process.env.API_KEY);
  form.append('client_secret', process.env.CLIENT_SECRET);
  form.append('code', token);
  form.append('redirect_uri', process.env.REDIRECT_URI);
  form.append('grant_type', 'authorization_code');

  axios.post('https://www.eventbrite.com/oauth/token', form, { headers: formHeaders })
  .then(function (response) {
    // TODO: get eventbrite data 
    // console.log(response);
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