/* eslint-disable no-underscore-dangle */
const express = require('express');

const searchRoutes = express.Router();
const {
  searchReed,
  saveSearch,
  deleteUserSavedSearch,
  getUserSavedSearches,
  getTrendingSearches,
} = require('../services/searchServices');
const isLoggedIn = require('../middleware/isLoggedIn');

// GET Number of Jobs, using provided search terms.
searchRoutes.get('/search', async (req, res) => {
  const data = await searchReed(req.query);
  const noOfResults = data.totalResults;
  const msg = noOfResults > 0 ? 'results found' : 'no results found';
  res.send({ noOfResults, msg });
});

// GET trending searches
searchRoutes.get('/search/trending', async (req, res) => {
  const result = await getTrendingSearches();
  res.status(result.code).send({ msg: result.msg, trendingSearches: result.trendingSearches });
});

// GET Saved searches for a given user
searchRoutes.get('/search/saved', isLoggedIn, async (req, res) => {
  if (process.env.MOCK_AUTHENTICATED_USER) {
    res.status(200).send({
      msg: 'saved searches found for user',
      savedSearches: [
        {
          dailySearchTermCount: [
            { timestamp: '2020-11-13T08:36:05.986Z', count: 252 },
            { timestamp: '2020-11-13T16:43:41.355Z', count: 263 },
          ],
          __v: 0,
          _id: '5fa8e4b2166a030017c86e80',
        },
      ],
    });
  } else {
    const result = await getUserSavedSearches(req.user._id);
    res.status(result.code).send({ msg: result.msg, savedSearches: result.savedSearches });
  }
});

// POST Save search
searchRoutes.post('/search/save', isLoggedIn, async (req, res) => {
  const result = await saveSearch(req);
  res.status(result.code).send({ msg: result.msg });
});

// PATCH Edit saved search, will delete trend history
searchRoutes.patch('/search/edit/:id', (req, res) => {});

// DELETE Saved search
searchRoutes.delete('/search/delete/:id', isLoggedIn, async (req, res) => {
  const result = await deleteUserSavedSearch(req);
  res.status(result.code).send({ msg: result.msg });
});

module.exports = searchRoutes;
