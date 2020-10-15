const express = require('express');

const userRoutes = express.Router();

userRoutes.get('/loggedin', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Successfully logged in: ${req.user}`);
  } else {
    res.redirect('/api/user/failure');
  }
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
