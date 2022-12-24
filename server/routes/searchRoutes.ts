/* eslint-disable no-underscore-dangle */
import express from 'express';
const searchRoutes = express.Router();

import {
  searchReed,
  saveSearch,
  deleteUserSavedSearch,
  getUserSavedSearches,
  getTrendingSearches,
} from '../services/searchServices';
import isLoggedIn from '../middleware/isLoggedIn';
import { SKILLS, LOCATIONS } from './constants';

// GET Number of Jobs, using provided search terms.
searchRoutes.get('/search', async (req, res) => {
  const data = await searchReed(req.query as any);
  const noOfResults = data.totalResults;
  const msg = noOfResults > 0 ? 'results found' : 'no results found';
  res.send({ noOfResults, msg });
});

// GET trending searches
searchRoutes.get('/search/trending', async (_req, res) => {
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
    const result = await getUserSavedSearches((req?.user as any)?._id || null);
    res.status(result.code).send({ msg: result.msg, savedSearches: result.savedSearches });
  }
});

// POST Save search
searchRoutes.post('/search/save', isLoggedIn, async (req, res) => {
  const result = await saveSearch(req);
  res.status(result.code).send({ msg: result.msg });
});

// PATCH Edit saved search, will delete trend history
searchRoutes.patch('/search/edit/:id', (_req, _res) => {});

// DELETE Saved search
searchRoutes.delete('/search/delete/:id', isLoggedIn, async (req, res) => {
  const result = await deleteUserSavedSearch(req);
  res.status(result.code).send({ msg: result.msg });
});

// GET permitted terms
searchRoutes.get('/search/permitted-terms', async (_req, res) => {
  res.status(200).send({ skills: SKILLS, locations: LOCATIONS });
});

export default searchRoutes;
