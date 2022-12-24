import { Search } from '../models/searchModel';
import { User } from '../models/userModel';
import { LOCATIONS, SKILLS } from '../routes/constants';

const axios = require('axios').default;
const { ObjectId } = require('mongoose').Types;

/**
 * Review the number provided and default (to 10) or round it as required
 */
const cleanseDistance = (distance = 10) => {
  const distanceFromLocationAsFloat = parseFloat(distance.toString());

  if (Number.isNaN(distanceFromLocationAsFloat)) {
    return 10;
  }

  const distanceRoundedAndTruncated = Math.trunc(Math.round(distanceFromLocationAsFloat));

  return distanceRoundedAndTruncated;
};

/**
 * Take the string of keywords, ensure they match the list of permitted words and return clean
 */
const cleanseKeywords = (keywords: string, permittedKeywords: Array<string>) => {
  const permittedKeywordsLowercase = permittedKeywords.map((word) => word.toLowerCase());
  const keywordsArray = keywords.split(' ');

  // The user selected keywords are sorted, by doing this we can match up duplicate user searches
  // meaning the search will only appear once in the database
  keywordsArray.sort();

  let keywordsToReturn = '';

  keywordsArray.forEach((keyword) => {
    if (permittedKeywordsLowercase.includes(keyword.toLowerCase())) {
      keywordsToReturn += `${keyword} `;
    }
  });

  keywordsToReturn = keywordsToReturn.trim();

  return keywordsToReturn;
};

/**
 * Check if the location is in the list of permitted locations, otherwise default it to London
 */
const cleanseLocation = (location: string, permittedLocations: Array<string>) => {
  const permittedLocationsLowercase = permittedLocations.map((word) => word.toLowerCase());

  if (!permittedLocationsLowercase.includes(location.toLowerCase())) {
    return 'london';
  }

  return location;
};

type Query = { distanceFromLocation: number; keywords: string; locationName: string };

/**
 * Build query string for API call
 */
const prepareQuery = (query: Query) => {
  const cleanQuery = query;

  cleanQuery.distanceFromLocation = cleanseDistance(cleanQuery.distanceFromLocation);

  cleanQuery.keywords = cleanseKeywords(cleanQuery.keywords, SKILLS);

  cleanQuery.locationName = cleanseLocation(cleanQuery.locationName, LOCATIONS);

  const queryToEncode = `keywords=${cleanQuery.keywords}&locationName=${cleanQuery.locationName}&distanceFromLocation=${cleanQuery.distanceFromLocation}`;

  return { encodedQuery: encodeURI(queryToEncode), cleanQueryObject: cleanQuery };
};

/**
 * Search reed using the jobs seeker API (https://www.reed.co.uk/developers/jobseeker)
 */
const searchReed = async (query: Query) => {
  // Request data from reed, per their API documentation Basic Auth is used
  // and the issued key is provided as the username, password is left blank.
  const { encodedQuery } = prepareQuery(query);

  try {
    const response = await axios({
      method: 'get',
      baseURL: 'https://www.reed.co.uk',
      url: `/api/1.0/search?${encodedQuery}`,
      headers: {
        Authorization: `Basic ${process.env.REED_B64}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }

  // If we hit an error we return nothing
  return { totalResults: 0 };
};

/**
 * Pushes a saved search ID to the user's document
 */
const pushSearchToUser = async (userId: string, searchId: string) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $push: { savedSearches: searchId },
    }).exec();
    return { code: 200, msg: 'search saved to user profile' };
  } catch (err) {
    console.log(err);
    return { code: 500, msg: 'Server error occurred' };
  }
};

/**
 * Finds saved search if it exists, creates it if it doesn't. In either case saves it to user.
 */
const saveSearch = async (req: any) => {
  const { cleanQueryObject } = prepareQuery(req.body);

  // If another user has already saved this search it will be returned and the array length will
  // be greater than 0, if the user already has it saved then it will not be added again
  const existingRecord = await Search.find({ searchTerms: cleanQueryObject }).exec();
  const user = await User.findById({ _id: req.user._id }).exec();

  if (existingRecord.length > 0) {
    if (user.savedSearches.includes(existingRecord[0]._id)) {
      return { code: 409, msg: 'user has already saved this search' };
    }

    const response = await pushSearchToUser(req.user._id, existingRecord[0]._id);
    return response;
  }

  // As the search doesn't exist, save it and add it to the user's saved searches
  const search = new Search({ searchTerms: cleanQueryObject });

  try {
    const savedSearch = await search.save();
    const response = await pushSearchToUser(req.user._id, savedSearch._id);
    return response;
  } catch (err) {
    console.log(err);
    return { code: 500, msg: 'Server error occurred' };
  }
};

/**
 * Deletes a given saved search id from a user's saved search list
 */
const deleteUserSavedSearch = async (req: any) => {
  try {
    const user = await User.findById({ _id: req.user._id }).exec();

    if (user.savedSearches.includes(ObjectId(req.params.id))) {
      await user.savedSearches.pull(ObjectId(req.params.id));
      await user.save();
      return { code: 200, msg: 'user saved search removed' };
    }

    return { code: 404, msg: 'search does not exist in user saved searches' };
  } catch (err) {
    console.log(err);
    return { code: 500, msg: 'Server error occurred' };
  }
};

/**
 * Returns an array of saved searches for a given user or a message if there are no saved searches
 */
const getUserSavedSearches = async (userId: string) => {
  try {
    const user = await User.findById({ _id: userId }).populate('savedSearches').exec();
    if (user.savedSearches.length > 0) {
      return {
        code: 200,
        msg: 'saved searches found for user',
        savedSearches: user.savedSearches,
      };
    }

    return { code: 200, msg: 'no saved searches for user' };
  } catch (err) {
    console.log(err);
    return { code: 500, msg: 'Server error occurred' };
  }
};

/**
 * Returns an array of searches from the Searches collection, these are not user specific
 */
const getTrendingSearches = async () => {
  try {
    const searches = await Search.find({}).limit(3).exec();
    return {
      code: 200,
      msg: 'trending searches found',
      trendingSearches: searches,
    };
  } catch (err) {
    console.log(err);
    return { code: 500, msg: 'Server error occurred' };
  }
};

export {
  searchReed,
  prepareQuery,
  saveSearch,
  pushSearchToUser,
  deleteUserSavedSearch,
  getUserSavedSearches,
  getTrendingSearches,
};
