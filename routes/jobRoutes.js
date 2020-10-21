/* eslint-disable no-underscore-dangle */
const express = require('express');

const jobRoutes = express.Router();
const { searchReed, saveSearch } = require('../services/jobServices');

// GET Jobs, using provided search terms.
jobRoutes.get('/search', async (req, res) => {
  const data = await searchReed(req.query);
  res.send(data);
});

// POST Save search
jobRoutes.post('/search/save', async (req, res) => {
  if (req.isAuthenticated()) {
    const result = await saveSearch(req);
    res.status(result.code).send(result.msg);
  } else {
    res.redirect('/api/user/loginfailure');
  }
});

// PATCH Edit saved search, will delete trend history
jobRoutes.patch('/search/edit/:id', (req, res) => {});

// DELETE Saved search
jobRoutes.delete('/search/delete/:id', (req, res) => {});

module.exports = jobRoutes;
