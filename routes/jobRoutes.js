/* eslint-disable no-underscore-dangle */
const express = require('express');

const jobRoutes = express.Router();
const { searchReed, saveSearch, deleteUserSavedSearch } = require('../services/jobServices');
const isLoggedIn = require('../middleware/isLoggedIn');

// GET Jobs, using provided search terms.
jobRoutes.get('/search', async (req, res) => {
  const data = await searchReed(req.query);
  res.send(data);
});

// POST Save search
jobRoutes.post('/search/save', isLoggedIn, async (req, res) => {
  const result = await saveSearch(req);
  res.status(result.code).send(result.msg);
});

// PATCH Edit saved search, will delete trend history
jobRoutes.patch('/search/edit/:id', (req, res) => {});

// DELETE Saved search
jobRoutes.delete('/search/delete/:id', isLoggedIn, async (req, res) => {
  const result = await deleteUserSavedSearch(req);
  res.status(result.code).send(result.msg);
});

module.exports = jobRoutes;
