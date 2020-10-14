const express = require('express');
const userRoutes = express.Router();

userRoutes.get('/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('SUCCESFULLY LOGGED IN');
  } else {
    res.redirect('/api/user/failure');
  }
});

userRoutes.get('/failure', (req, res) => {
  res.send('NOT AUTHENTICATED');
});

userRoutes.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = userRoutes;
