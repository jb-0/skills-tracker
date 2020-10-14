require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const { connection } = mongoose;

const app = express();
const PORT = process.env.PORT || 4000;

const userRoutes = require('./routes/userRoutes');

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
