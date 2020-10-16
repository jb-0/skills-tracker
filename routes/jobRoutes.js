const express = require('express');

const jobRoutes = express.Router();
const searchReed = require('../services/jobServices');

// GET Jobs, using provided search terms.
jobRoutes.get('/search', async (req, res) => {
  const data = await searchReed();
  res.send(data);
});

// POST Save search
jobRoutes.post('/search/save', (req, res) => {});

// PATCH Edit saved search, will delete trend history
jobRoutes.patch('/search/edit/:id', (req, res) => {});

// DELETE Saved search
jobRoutes.delete('/search/delete/:id', (req, res) => {});

module.exports = jobRoutes;
