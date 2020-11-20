/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
const request = require('supertest');
const { assert } = require('chai');

const app = require('../server.js');
const { prepareQuery, searchReed } = require('../services/searchServices');

const { Search } = require('../models/searchModel.js');
const { User } = require('../models/userModel.js');

// *************************************
// JOB SERVICES TESTS
// *************************************
describe('Search Services', function () {
  describe('GET /api/jobs/search', function () {
    it('the number of jobs available is returned when the search route is called',
      async function () {
        const res = await request(app)
          .get('/api/job/search')
          .query({
            keywords: 'node angular java',
            locationName: 'london',
            distanceFromLocation: '10'
          });

        assert.strictEqual(res.status, 200);
        assert.isAtLeast(res.body.noOfResults, 1);
      });

    describe('searchReed()', function () {
      it('jobs are returned when an api call is made to reed.co.uk', async function () {
        const data = await searchReed({
          distanceFromLocation: 10,
          keywords: 'react sql',
          locationName: 'london'
        });

        assert.isAtLeast(data.totalResults, 1);
      });
    });

    describe('prepareQuery()', function () {
      it('locations that are not permitted are replaced with london', function () {
        const testCases = ['llondon', '[=?{]\'/!{"`'];
        const expectedQuery = 'keywords=react%20sql&locationName=london&distanceFromLocation=10';

        testCases.forEach((testCase) => {
          const preparedQuery = prepareQuery({
            distanceFromLocation: 10,
            keywords: 'react sql',
            locationName: testCase,
          }).encodedQuery;

          assert.strictEqual(preparedQuery, expectedQuery);
        });
      });

      it('permitted locations are not replaced with london', function () {
        const testCases = ['sheffield', 'devon'];

        testCases.forEach((testCase) => {
          const expectedQuery = `keywords=react%20sql&locationName=${
            testCase}&distanceFromLocation=10`;

          const preparedQuery = prepareQuery({
            distanceFromLocation: 10,
            keywords: 'react sql',
            locationName: testCase,
          }).encodedQuery;

          assert.strictEqual(preparedQuery, expectedQuery);
        });
      });

      it('keywords that are not permitted are removed', function () {
        const testCases = ['react farming sql', 'react sql flying [=?{]\'/!{"` as[=?{]\'/!{"`a'];
        const expectedQuery = 'keywords=react%20sql&locationName=london&distanceFromLocation=10';

        testCases.forEach((testCase) => {
          const preparedQuery = prepareQuery({
            distanceFromLocation: 10,
            keywords: testCase,
            locationName: 'london',
          }).encodedQuery;

          assert.strictEqual(preparedQuery, expectedQuery);
        });
      });

      it('distance must be an int, floats are converted to int and NaNs are defaulted to 10',
        function () {
          const baseExpectedQuery = 'keywords=react%20sql&locationName=london&distanceFromLocation=';
          const tests = [
            { testCase: 'not a number', outcome: 10 },
            { testCase: 7.14, outcome: 7 },
            { testCase: 7.74, outcome: 8 },
            { testCase: '8.14', outcome: 8 },
            { testCase: '8.84', outcome: 9 },
            { testCase: '9', outcome: 9 },
            { testCase: '1242353463456890102312.9866786765', outcome: 1242353463456890102312 },
          ];

          tests.forEach((test) => {
            const preparedQuery = prepareQuery({
              distanceFromLocation: test.testCase,
              keywords: 'react sql',
              locationName: 'london',
            }).encodedQuery;
            assert.strictEqual(
              preparedQuery,
              `${baseExpectedQuery}${test.outcome}`
            );
          });
        });
    });
  });

  let USER_COOKIE;
  let USER_2_COOKIE;

  describe('POST /api/job/search/save', function () {
    describe('saveSearch() & pushSearchToUser()', function () {
      // Temporarily create a second user for the duration of testing, but first delete the user if
      // they are present in db
      before(async function () {
        User.deleteOne({ email: process.env.TEST_USER_2 }, (err) => {
          assert.isNotTrue(err);
        });

        const res = await request(app).post('/auth/register').send({
          email: process.env.TEST_USER_2,
          password: process.env.TEST_USER_PASSWORD_2,
        });

        assert.strictEqual(res.status, 307);
      });

      // Login as both test users, storing the cookies in separate variables
      before(async function () {
        const res = await request(app).post('/auth/login').send({
          email: process.env.TEST_USER,
          password: process.env.TEST_USER_PASSWORD,
        });

        assert.strictEqual(res.status, 302);
        assert.strictEqual(res.header.location, '/api/user/loggedin');

        USER_COOKIE = res.header['set-cookie'];

        const res_user_2 = await request(app).post('/auth/login').send({
          email: process.env.TEST_USER_2,
          password: process.env.TEST_USER_PASSWORD_2,
        });

        assert.strictEqual(res_user_2.status, 302);
        assert.strictEqual(res_user_2.header.location, '/api/user/loggedin');

        USER_2_COOKIE = res_user_2.header['set-cookie'];
      });

      // Delete existing savedSearches
      before(async function () {
        Search.deleteMany({}, (err) => {
          assert.isNotTrue(err);
        });
      });

      it('unauthenticated user cannot access the save search route', async function () {
        const search = {
          keywords: 'react node',
          locationName: 'birmingham',
          distanceFromLocation: 20,
        };

        const res = await request(app)
          .post('/api/job/search/save')
          .send(search);

        assert.strictEqual(res.status, 302);
        assert.strictEqual(res.header.location, '/api/user/loginfailure');
      });

      it('new searches are saved in the Search collection and added to the user\'s savedSearches',
        async function () {
          const search = {
            keywords: 'react node',
            locationName: 'birmingham',
            distanceFromLocation: 20,
          };

          const res = await request(app)
            .post('/api/job/search/save')
            .send(search)
            .set('Cookie', USER_COOKIE);

          // Confirm positive response from server
          assert.strictEqual(res.status, 200);
          assert.include(res.text, 'search saved to user profile');

          //Confirm that an entry has been added to the user's savedSearches
          const user = await User.findOne({ email: process.env.TEST_USER }).exec();
          assert.strictEqual(user.savedSearches.length, 1);
        });

      it('searches already saved by the user are not duplicated in the User collection',
        async function () {
          const search = {
            keywords: 'react node',
            locationName: 'birmingham',
            distanceFromLocation: 20,
          };

          const res = await request(app)
            .post('/api/job/search/save')
            .send(search)
            .set('Cookie', USER_COOKIE);

          // Confirm positive response from server
          assert.strictEqual(res.status, 409);
          assert.include(res.text, 'user has already saved this search');

          //Confirm that only one entry exists in the user's savedSearches
          const user = await User.findOne({ email: process.env.TEST_USER }).exec();
          assert.strictEqual(user.savedSearches.length, 1);
        });

      it('searches saved by other users can be added to a user\'s savedSearches', async function () {
        const search = {
          keywords: 'react node',
          locationName: 'birmingham',
          distanceFromLocation: 20,
        };

        const res = await request(app)
          .post('/api/job/search/save')
          .send(search)
          .set('Cookie', USER_2_COOKIE);

        // Confirm positive response from server
        assert.strictEqual(res.status, 200);
        assert.include(res.text, 'search saved to user profile');

        // Confirm that an entry has been added to the user's savedSearches
        const user = await User.findOne({ email: process.env.TEST_USER_2 }).exec();
        assert.strictEqual(user.savedSearches.length, 1);
      });

      it('searches saved by multiple users are not duplicated in the Searches collection',
        async function () {
          const filter = {
            keywords: 'node react',
            locationName: 'birmingham',
            distanceFromLocation: 20,
          };

          const searchExistsInDb = await Search.find({
            'searchTerms.keywords': filter.keywords,
            'searchTerms.locationName': filter.locationName,
            'searchTerms.distanceFromLocation': filter.distanceFromLocation
          }).exec();

          assert.strictEqual(searchExistsInDb.length, 1);
        });
    });
  });

  describe('GET /api/jobs/search/trending', function () {
    it('up to three results are returned when the trending route is called',
      async function () {
        const res = await request(app)
          .get('/api/job/search/trending');

        assert.strictEqual(res.status, 200);
        assert.isAtLeast(res.body.trendingSearches.length, 1);
        assert.isAtMost(res.body.trendingSearches.length, 3);
      });
  });

  describe('DELETE /api/job/search/delete/:id', function () {
    let savedSearchId;
    before(async function () {
      const user = await User.findOne({ email: process.env.TEST_USER }).exec();
      savedSearchId = user.savedSearches[0];
    });

    describe('deleteUserSavedSearch()', function () {
      it('it is possible to delete a specific search if it exists in a user\'s saved searches',
        async function () {
          const res = await request(app)
            .delete(`/api/job/search/delete/${savedSearchId}`)
            .set('Cookie', USER_COOKIE);

          // Confirm positive response from server
          assert.strictEqual(res.status, 200);
          assert.include(res.text, 'user saved search removed');

          // Confirm that no entries exist in the user's savedSearches
          const user = await User.findOne({ email: process.env.TEST_USER }).exec();
          assert.strictEqual(user.savedSearches.length, 0);
        });

      it('attempting to delete a search that does not exist throws resource not found',
        async function () {
          const res = await request(app)
            .delete(`/api/job/search/delete/${savedSearchId}`)
            .set('Cookie', USER_COOKIE);

          // Verify 404 and message stating the item does not exist
          assert.strictEqual(res.status, 404);
          assert.include(res.text, 'search does not exist in user saved searches');
        });

      it('unauthenticated user cannot access the delete search route', async function () {
        const res = await request(app)
          .delete(`/api/job/search/delete/${savedSearchId}`);

        assert.strictEqual(res.status, 302);
        assert.strictEqual(res.header.location, '/api/user/loginfailure');
      });
    });
  });

  describe('GET /api/job/search/saved', function () {
    describe('getUserSavedSearches()', function () {
      it('a user can get a full list of their saved searches',
        async function () {
          const res = await request(app)
            .get('/api/job/search/saved')
            .set('Cookie', USER_2_COOKIE);

          assert.strictEqual(res.status, 200);
          assert.strictEqual(res.body.msg, 'saved searches found for user');
          assert.isAtLeast(res.body.savedSearches.length, 1);
        });

      it('if a user has no saved searches the returned message states this',
        async function () {
          const res = await request(app)
            .get('/api/job/search/saved')
            .set('Cookie', USER_COOKIE);

          assert.strictEqual(res.status, 200);
          assert.strictEqual(res.body.msg, 'no saved searches for user');
        });

      it('unauthenticated user cannot access the saved search route', async function () {
        const res = await request(app).get('/api/job/search/saved');

        assert.strictEqual(res.status, 302);
        assert.strictEqual(res.header.location, '/api/user/loginfailure');
      });
    });
  });
});
