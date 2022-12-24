import express from 'express';
import isLoggedIn from '../middleware/isLoggedIn';

const userRoutes = express.Router();
const mockAuthdUser =
  typeof process.env.MOCK_AUTHENTICATED_USER === 'boolean' ? process.env.MOCK_AUTHENTICATED_USER : false;

userRoutes.get('/loggedin', isLoggedIn, (_req, res) => {
  res.redirect(process.env.LOGIN_REDIRECT || '');
});

userRoutes.get('/loginfailure', (_req, res) => {
  res.status(401).send('Authentication unsuccessful');
});

userRoutes.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(process.env.LOGOUT_REDIRECT || '');
    });
  });
});

userRoutes.get('/isloggedin', (req, res) => {
  if (mockAuthdUser) {
    res.json(true);
  } else if (req.isAuthenticated()) {
    res.json(true);
  } else {
    res.json(false);
  }
});

export default userRoutes;
