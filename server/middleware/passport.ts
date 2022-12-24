import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User } from '../models/userModel';

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: any, user: Express.User) => {
    done(err, user);
  });
});

/* *************************************************************************************************
GOOGLE STRATEGY
************************************************************************************************* */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    (_accessToken, _refreshToken, profile, cb) => {
      User.findOrCreate({ googleId: profile.id }, (err: any, user: Express.User) => cb(err, user));
    },
  ),
);

/* *************************************************************************************************
FACEBOOK STRATEGY
************************************************************************************************* */
// The callback for FB differs in prod vs production
const facebookCallback = process.env.PROD
  ? 'https://the-skills-tracker.herokuapp.com/auth/facebook/callback'
  : '/auth/facebook/callback';

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID || '',
      clientSecret: process.env.FACEBOOK_APP_SECRET || '',
      callbackURL: facebookCallback,
    },
    (_accessToken, _refreshToken, profile, cb) => {
      User.findOrCreate({ facebookId: profile.id }, (err: any, user: Express.User) => cb(err, user));
    },
  ),
);

/* *************************************************************************************************
LOCAL STRATEGY
************************************************************************************************* */
passport.use(User.createStrategy());
