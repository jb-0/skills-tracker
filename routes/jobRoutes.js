const express = require('express');
const https = require('https');

const jobRoutes = express.Router();

// GET Jobs, using provided search terms. Functionality/logic behind the search to be seperated into
// services .js file
jobRoutes.get('/search', async (req, res) => {
  

  const options = {
    host = 'www.reed.co.uk',
    path = '/api/1.0/search?keywords=accountant&location=london&distancefromlocation=15',
    port: 443,
    headers: {
      'Authorization' : 'Basic' + new Buffer.from(process.env.REED),
    },
  };

  const apiRes = await https.get(url);
  console.log(apiRes);
  res.send('done');
});

// POST Save search
jobRoutes.post('/search/save', (req, res) => {});

// PATCH Edit saved search, will delete trend history
jobRoutes.patch('/search/edit/:id', (req, res) => {});

// DELETE Saved search
jobRoutes.delete('/search/delete/:id', (req, res) => {});

module.exports = jobRoutes;
