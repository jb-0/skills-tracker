/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
const request = require('supertest');
const { assert } = require('chai');

const app = require('../server.js');
const { prepareQuery, searchReed } = require('../services/jobServices');

const { Search } = require('../models/searchModel.js');
const { User } = require('../models/userModel.js');

// *************************************
// JOB SERVICES TESTS
// *************************************
describe('Job Services', function () {
  describe('GET /api/jobs/search', function () {
    describe('searchReed()', function () {
      it('jobs are returned when an api call is made to reed.co.uk', async function () {
        const data = await searchReed({
          distanceFromLocation: 10,
          keywords: 'react sql',
          locationName: 'london'
        });

        assert.isAbove(data.totalResults, 0);
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

  describe('POST /api/jobs/search/save', function () {
    describe('saveSearch() & pushSearchToUser()', function () {
      let USER_COOKIE;
      let USER_2_COOKIE;

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
          assert.strictEqual(res.text, 'search saved to user profile');

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
          assert.strictEqual(res.text, 'user has already saved this search');

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
        assert.strictEqual(res.text, 'search saved to user profile');

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
});
