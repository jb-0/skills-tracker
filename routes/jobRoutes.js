/* eslint-disable no-underscore-dangle */
const express = require('express');

const jobRoutes = express.Router();
const {
  searchReed,
  saveSearch,
  deleteUserSavedSearch,
  getUserSavedSearches,
} = require('../services/jobServices');
const isLoggedIn = require('../middleware/isLoggedIn');

// GET Number of Jobs, using provided search terms.
jobRoutes.get('/search', async (req, res) => {
  const data = await searchReed(req.query);
  const noOfResults = data.totalResults;
  const msg = noOfResults > 0 ? 'results found' : 'no results found';
  res.send({ noOfResults, msg });
});

// GET Saved searches for a given user
jobRoutes.get('/search/saved', isLoggedIn, async (req, res) => {
  const result = await getUserSavedSearches(req.user._id);
  res.status(result.code).send({ msg: result.msg, savedSearches: result.savedSearches });
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
