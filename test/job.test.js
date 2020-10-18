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
  describe('prepareQuery()', function () {
    it('locations that are not permitted are replaced with london', function () {
      const testCases = ['llondon', '[=?{]\'/!{"`'];
      const expectedQuery = 'keywords=react%20sql&locationName=london&distanceFromLocation=10';

      testCases.forEach((testCase) => {
        const preparedQuery = prepareQuery({
          distanceFromLocation: 10,
          keywords: 'react sql',
          locationName: testCase,
        });

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
        });

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
        });

        assert.strictEqual(preparedQuery, expectedQuery);
      });
    });
  });
});
