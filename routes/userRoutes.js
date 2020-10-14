const express = require('express');
const userRoutes = express.Router();

userRoutes.get('/', (req, res) => {
  res.send('naa');
});

userRoutes.get('/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('welcome');
  } else {
    res.redirect('/api/user/failure');
  }
});

userRoutes.get('/failure', (req, res) => {
  res.send('naa');
});

module.exports = userRoutes;
