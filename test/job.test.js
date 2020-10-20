/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
const request = require('supertest');
const { assert } = require('chai');

const app = require('../server.js');
const { prepareQuery, searchReed } = require('../services/jobServices');

// *************************************
// JOB SERVICES TESTS
// *************************************
describe('Job Services', function () {
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

  describe('saveSearch() & pushSearchToUser()', function () {
    before(async function () {
      const res = await request(app).post('/auth/register').send({
        email: process.env.TEST_USER_2,
        password: process.env.TEST_USER_PASSWORD_2,
      });

      // Temporarily create a second user for the duration of testing
      assert.strictEqual(res.status, 307);
    });

    it('new searches are saved and added to the user\'s savedSearches', async function () {

    });

    it('searches already saved by the user are not duplicated in the User collection',
      async function () {

    });

    it('searches saved by other users can be added to a user\'s savedSearches', async function () {

    });

    it('searches saved by multiple users are not duplicated in the Searches collection',
      async function () {

    });

    after(async function () {
      // Delete the test user
      User.deleteOne({ email: process.env.TEST_USER_2 }, (err) => {
        assert.isNotTrue(err);
      });
    });
  });
});
