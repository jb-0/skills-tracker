/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
const request = require('supertest');
const { assert } = require('chai');

const app = require('../server.js');

// *************************************
// USER ROUTE TESTS
// *************************************
describe('User routes', function () {
  let cookie;
  before(async function () {
    // Login as the test user created in /auth.test.js
    const res = await request(app).post('/auth/login').send({
      email: process.env.TEST_USER,
      password: process.env.TEST_USER_PASSWORD,
    });

    assert.strictEqual(res.status, 302);
    assert.strictEqual(res.header.location, '/api/user/loggedin');

    cookie = res.header['set-cookie'];
  });

  describe('GET /api/user/loggedin', function () {
    it('authenticated user can is redirected to frontend profile page', async function () {
      const res = await request(app).get('/api/user/loggedin')
        .set('Cookie', cookie);

      assert.strictEqual(res.status, 302);
      assert.strictEqual(res.header.location, 'http://localhost:3000/profile');
    });

    it('unauthenticated user cannot access authenticated route', async function () {
      const res = await request(app).get('/api/user/loggedin');

      assert.strictEqual(res.status, 302);
      assert.strictEqual(res.header.location, '/api/user/loginfailure');
    });
  });

  describe('GET /api/user/logout', function () {
    it('authenticated user can log out', async function () {
      const res = await request(app).get('/api/user/logout')
        .set('Cookie', cookie);

      assert.strictEqual(res.status, 302);
    });

    it('once logged out cookie cannot be used', async function () {
      const res = await request(app).get('/api/user/isloggedin')
        .set('Cookie', cookie);

      // Boolean delivered as string, this check converts to boolean
      const isloggedin = (res.text === 'true');

      assert.isFalse(isloggedin);
    });
  });
});
