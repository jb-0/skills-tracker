const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { User } = require('../models/userModel.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne(
        {
          googleId: profile.id,
        },
        (err, user) => {
          if (err) {
            return cb(err);
          }
          if (!user) {
            user = new User({
              googleId: profile.id,
            });
            user.save((err) => {
              if (err) console.log(err);
              return cb(err, user);
            });
          } else {
            return cb(err, user);
          }
        },
      );
    },
  ),
);
