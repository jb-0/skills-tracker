const express = require('express');

const userRoutes = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

userRoutes.get('/loggedin', isLoggedIn, (req, res) => {
  res.redirect(process.env.LOGIN_REDIRECT);
});

userRoutes.get('/loginfailure', (req, res) => {
  res.status(401).send('Authentication unsuccessful');
});

userRoutes.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    req.logout();

    // TODO, no need for redirect, instead send a res for react to use?
    res.redirect(process.env.LOGOUT_REDIRECT);
  });
});

userRoutes.get('/isloggedin', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(true);
  } else {
    res.json(false);
  }
});

module.exports = userRoutes;
