const express = require('express');
const passport = require('passport');

const authRoutes = express.Router();
const { User } = require('../models/userModel.js');

/* *************************************************************************************************
GOOGLE ROUTES
************************************************************************************************* */
authRoutes.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);

authRoutes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/user/failure' }),
  (req, res) => {
    res.redirect('/api/user/loggedin');
  }
);

/* *************************************************************************************************
FACEBOOK ROUTES
************************************************************************************************* */
authRoutes.get('/facebook', passport.authenticate('facebook'));

authRoutes.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/api/user/loginfailure' }),
  (req, res) => {
    res.redirect('/api/user/loggedin');
  }
);

/* *************************************************************************************************
LOCAL ROUTES
These are used in dev/test only and are disabled in production
************************************************************************************************* */
if (!process.env.PROD) {
  authRoutes.post('/register', (req, res) => {
    User.register(
      new User({ email: req.body.email }),
      req.body.password,
      (err, user) => {
        if (err) {
          return res.status(401).send(`${err}`);
        }
      }
    );
  });

  authRoutes.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/api/user/loginfailure' }),
    (req, res) => {
      res.redirect('/api/user/loggedin');
    }
  );
}

module.exports = authRoutes;
