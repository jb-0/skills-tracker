const express = require('express');

const userRoutes = express.Router();

userRoutes.get('/', (req, res) => {
  res.send('naa');
});

userRoutes.get('/success', (req, res) => {
  res.send('welcome');
});

module.exports = userRoutes;
