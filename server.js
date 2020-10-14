require('dotenv').config();

// Require packages
const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport");

// Require routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const { connection } = mongoose;
const app = express();
const PORT = process.env.PORT || 4000;

async function main() {
  /* ***************************************
  DB CONNECTION
  *************************************** */
  const DB_PATH = process.env.PROD
    ? process.env.PROD_DB_PATH
    : process.env.DEV_DB_PATH;

  try {
    await mongoose.connect(DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }

  /* ***************************************
  APP CONFIG AND ROUTES
  *************************************** */
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/api/user', userRoutes);
  app.use('/auth/', authRoutes)
  app.use(passport.initialize());
  require("./middleware/passport");

  if (process.env.PROD) {
    app.use(express.static(`${__dirname}/frontend/build`));
    app.get('*', (req, res) => {
      res.sendFile(`${__dirname}/frontend/build/index.html`);
    });
  }

  app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
  });
}

main();

module.exports = app;
