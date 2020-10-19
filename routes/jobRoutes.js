const express = require('express');

const jobRoutes = express.Router();
const { searchReed, prepareQuery } = require('../services/jobServices');
const { Search } = require('../models/searchModel.js');

// GET Jobs, using provided search terms.
jobRoutes.get('/search', async (req, res) => {
  const data = await searchReed(req.query);
  res.send(data);
});

// POST Save search
jobRoutes.post('/search/save', (req, res) => {
  const { cleanQueryObject } = prepareQuery(req.body);
  const search = new Search({ searchTerms: cleanQueryObject });

  search.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send(search);
    }
  });
});

// PATCH Edit saved search, will delete trend history
jobRoutes.patch('/search/edit/:id', (req, res) => {});

// DELETE Saved search
jobRoutes.delete('/search/delete/:id', (req, res) => {});

module.exports = jobRoutes;
