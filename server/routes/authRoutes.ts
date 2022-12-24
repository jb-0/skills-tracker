import express from 'express';
import passport from 'passport';
import { User } from '../models/userModel';

const authRoutes = express.Router();

/* *************************************************************************************************
GOOGLE ROUTES
************************************************************************************************* */
authRoutes.get('/google', passport.authenticate('google', { scope: ['profile'] }));

authRoutes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/user/failure' }),
  (_req, res) => {
    res.redirect('/api/user/loggedin');
  },
);

/* *************************************************************************************************
FACEBOOK ROUTES
************************************************************************************************* */
authRoutes.get('/facebook', passport.authenticate('facebook'));

authRoutes.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/api/user/loginfailure' }),
  (_req, res) => {
    res.redirect('/api/user/loggedin');
  },
);

/* *************************************************************************************************
LOCAL ROUTES
These are used in dev/test only and are disabled in production
************************************************************************************************* */
if (!process.env.PROD) {
  authRoutes.post('/register', (req, res) => {
    User.register(new User({ email: req.body.email }), req.body.password, (err: string) => {
      if (err) {
        res.status(401).send(`${err}`);
      } else {
        res.redirect(307, '/auth/login');
      }
    });
  });

  authRoutes.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/api/user/loginfailure' }),
    (_req, res) => {
      res.redirect('/api/user/loggedin');
    },
  );
}

export default authRoutes;
