const express = require('express');
const passport = require('passport');

const authRoutes = express.Router();

/* *************************************************************************************************
GOOGLE ROUTES
************************************************************************************************* */
authRoutes.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] }),
);

authRoutes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/user/failure' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/api/user/success');
  },
);

/* *************************************************************************************************
FACEBOOK ROUTES
************************************************************************************************* */
authRoutes.get('/facebook', passport.authenticate('facebook'));

authRoutes.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/api/user/success');
  },
);

module.exports = authRoutes;
