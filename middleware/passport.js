const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const { User } = require('../models/userModel.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/* *************************************************************************************************
GOOGLE STRATEGY
************************************************************************************************* */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate({ googleId: profile.id }, (err, user) => cb(err, user));
    },
  ),
);

/* *************************************************************************************************
FACEBOOK STRATEGY
************************************************************************************************* */
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'https://the-skills-tracker.herokuapp.com/auth/facebook/callback',
},
((accessToken, refreshToken, profile, cb) => {
  User.findOrCreate({ facebookId: profile.id }, (err, user) => cb(err, user));
})));

/* *************************************************************************************************
LOCAL STRATEGY
************************************************************************************************* */
passport.use(User.createStrategy());
