const express = require('express');

const userRoutes = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

userRoutes.get('/loggedin', isLoggedIn, (req, res) => {
  res.send(`Successfully logged in: ${req.user}`);
});

userRoutes.get('/loginfailure', (req, res) => {
  res.status(401).send('Authentication unsuccessful');
});

userRoutes.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

userRoutes.get('/isloggedin', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(true);
  } else {
    res.json(false);
  }
});

module.exports = userRoutes;
