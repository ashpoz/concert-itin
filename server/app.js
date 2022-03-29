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
  const formFields = new URLSearchParams();
  const formHeaders = { 'content-type' : 'application/x-www-form-urlencoded' } 
  const token = req.query.code;

  formFields.append('client_id', process.env.API_KEY);
  formFields.append('client_secret', process.env.CLIENT_SECRET);
  formFields.append('code', token);
  formFields.append('redirect_uri', process.env.REDIRECT_URI);
  formFields.append('grant_type', 'authorization_code');

  axios.post('https://www.eventbrite.com/oauth/token', formFields, { formHeaders })
  .then(function (response) {
    // TODO: get eventbrite data 
    console.log(response);
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