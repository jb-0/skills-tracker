const express = require('express');
const passport = require('passport');

const authRoutes = express.Router();

authRoutes.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

authRoutes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    const { token } = req.user;
    // res.redirect(`http://localhost:3000?token=${token}`);
    res.redirect('/api/user/success');
  },
);

module.exports = authRoutes;
