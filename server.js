require('dotenv').config();

// Require packages
const express = require('express');
const enforce = require('express-sslify');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Require routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');

const requireHTTPS = require('./middleware/requireHTTPS');

const app = express();
const PORT = process.env.PORT || 4000;

async function main() {
  /* ***************************************
  DB CONNECTION
  *************************************** */
  const DB_PATH = process.env.PROD ? process.env.PROD_DB_PATH : process.env.DEV_DB_PATH;

  try {
    await mongoose.connect(DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.log(error);
  }

  /* ***************************************
  APP CONFIG AND ROUTES
  *************************************** */
  if (process.env.PROD) app.use(requireHTTPS);
  if (process.env.PROD) app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      cookie: { maxAge: 7 * (24 * 60 * 60 * 1000) },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  require('./middleware/passport');

  app.use('/api/user', userRoutes);
  app.use('/auth/', authRoutes);
  app.use('/api/job', searchRoutes);

  app.use(express.static(`${__dirname}/client/build`));
  app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
  });
}

main();

module.exports = app;
