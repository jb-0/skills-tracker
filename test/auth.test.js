/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
const request = require('supertest');
const { assert } = require('chai');

const app = require('../server.js');
const { User } = require('../models/userModel.js');

// *************************************
// AUTH ROUTE TESTS
// *************************************
describe('User routes', function () {
  before(async function () {
    // Delete the existing test user
    User.deleteOne({ email: process.env.TEST_USER }, (err) => {
      assert.isNotTrue(err);
    });
  });

  describe('POST /auth/register', function () {
    it('it is not possible to locally register a user without a password', async function () {
      const res = await request(app).post('/auth/register').send({
        email: process.env.TEST_USER,
        password: undefined,
      });

      assert.strictEqual(res.status, 401);
      assert.strictEqual(
        res.text,
        'MissingPasswordError: No password was given'
      );
    });

    it('it is not possible to locally register a user without an email', async function () {
      const res = await request(app).post('/auth/register').send({
        email: undefined,
        password: process.env.TEST_USER_PASSWORD,
      });

      assert.strictEqual(res.status, 401);
      assert.strictEqual(
        res.text,
        'MissingUsernameError: No username was given'
      );
    });

    it('a user can be registered locally when email and password are supplied', async function () {
      const res = await request(app).post('/auth/register').send({
        email: process.env.TEST_USER,
        password: process.env.TEST_USER_PASSWORD,
      });

      assert.strictEqual(res.status, 307);
    });

    it('registration fails where a user already exists', async function () {
      const res = await request(app).post('/auth/register').send({
        email: process.env.TEST_USER,
        password: process.env.TEST_USER_PASSWORD,
      });

      assert.strictEqual(res.status, 401);
      assert.strictEqual(
        res.text,
        'UserExistsError: A user with the given username is already registered'
      );
    });
  });
});
