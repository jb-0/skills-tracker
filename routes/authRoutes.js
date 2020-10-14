const express = require('express');
const passport = require('passport');

const authRoutes = express.Router();

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

module.exports = authRoutes;
